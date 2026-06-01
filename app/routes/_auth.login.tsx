import { ActionFunctionArgs, Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getClientIPAddress } from 'remix-utils/get-client-ip-address';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  Form,
  json,
  MetaFunction,
  useNavigate,
  redirect,
  useActionData,
} from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading, Button, Input } from '~/components';
import prisma from '../../prisma/index';
import { mixpanelTrack } from '~/utils/mixpanel/mixpanel.server';

const schema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const meta: MetaFunction = () => {
  return [
    { title: 'Login | Recipe Mania' },
    {
      name: 'description',
      content:
        'Welcome to Recipe Mania, your one-stop solution where you can browse recipes from around the world, get recipe scores and filter recipes according to your need and diet!',
    },
  ];
};

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const loginResponse = useActionData<{
    error?: string;
    success?: boolean;
    token?: string;
  }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormValues> = () => {
    setLoading(true);
    setFormError('');
    formRef.current?.submit();
  };

  useEffect(() => {
    setLoading(false);
    setFormError('');
    if (!loginResponse) return;

    if (loginResponse.error) {
      setFormError(loginResponse.error);
      return;
    }

    if (loginResponse.success && loginResponse.token) {
      localStorage.setItem('token', loginResponse.token);
      navigate('/');
    }
  }, [loginResponse]);

  return (
    <main
      id="login-form"
      className="flex flex-col px-6"
    >
      <Heading
        content="Welcome Back 👋"
        type="section"
        className="self-start"
      />
      <p className="mb-8 text-sm text-gray-600">
        Today is a new day. It's your day. You shape it. Sign in to start
        managing your projects.
      </p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        method="post"
        action="/login"
        ref={formRef}
      >
        <Input
          label="Email"
          name="email"
          register={register}
          placeholder="name@example.com"
          error={errors.email?.message as string}
        />
        <Input
          label="Password"
          name="password"
          register={register}
          type="password"
          placeholder="Your password"
          error={errors.password?.message as string}
        />
        <Link
          to=""
          className="self-end text-sm opacity-60"
        >
          Forgot password?
        </Link>
        {formError ? (
          <p className="mt-1 py-2 text-sm text-red-700">{formError}</p>
        ) : null}
        <Button
          buttonText="Sign in"
          className="mt-4"
          submit={true}
          loading={loading}
        />
      </Form>
    </main>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const SECRET_KEY = process.env.SECRET_KEY || '';

  if (!email || !password) {
    return { error: 'All fields are required!' };
  }

  try {
    const data = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!data) {
      return json(
        { error: "User doesn't exist. Please signup for a new account" },
        { status: 401 },
      );
    }

    const dbPassword = data.password;

    const passwordCorrect = await bcrypt.compare(password, dbPassword);

    if (!passwordCorrect) {
      return json(
        { error: 'Incorrect password. Please try again' },
        { status: 401 },
      );
    }

    if (!data.verified) {
      return json(
        { error: 'Email not verified. Please verify your email first.' },
        { status: 403 },
      );
    }

    const token = jwt.sign(
      { id: data.user_id, email: data.email },
      SECRET_KEY,
      { expiresIn: '3d' },
    );

    const distinctId =
      data.user_id || request.headers.get('x-forwarded-for') || 'anonymous';

    const ipAddress = getClientIPAddress(request) || '127.0.0.1';

    mixpanelTrack(
      'Form Submitted',
      '/login',
      distinctId,
      ipAddress,
      request.headers.get('user-agent') || '',
      {
        email: data.email,
      },
    );

    return redirect('/', {
      headers: {
        'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
      },
    });
  } catch (error) {
    console.error('error', error);
    return json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
};
