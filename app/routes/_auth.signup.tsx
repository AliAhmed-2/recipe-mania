/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  json,
  Link,
  MetaFunction,
  useActionData,
} from '@remix-run/react';
import bcrypt from 'bcryptjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs } from '@remix-run/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/index';
import { Button, Heading, Input } from '~/components';

const schema = z.object({
  fullName: z
    .string()
    .min(1, 'Full Name is required')
    .max(20, 'Please enter a name within 20 characters.'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
  agreeToTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must agree to the terms and conditions',
    ),
});

export const meta: MetaFunction = () => {
  return [
    { title: 'Signup | Recipe Mania' },
    {
      name: 'description',
      content:
        'Welcome to Recipe Mania, your one-stop solution where you can browse recipes from around the world, get recipe scores and filter recipes according to your need and diet!',
    },
  ];
};

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  agreeToTerms?: boolean;
}

export default function SignupPage() {
  const actionData = useActionData<{
    error?: unknown;
    code?: string;
    success?: boolean;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setFormError('');
    if (!actionData) return;

    if (actionData.error) {
      if (actionData.code && actionData.code === 'P2002') {
        setFormError('Email already registered with a different account.');
        return;
      }
      setFormError('Something went wrong. Please try again');
      return;
    }

    if (actionData.success) setVerificationSent(true);
  }, [actionData]);

  const onSubmit: SubmitHandler<SignupFormValues> = () => {
    setLoading(true);
    formRef.current?.submit();
  };

  return (
    <main
      id="signup-form"
      className="flex flex-col px-6"
    >
      {verificationSent ? (
        <div className="flex-col-center gap-4">
          <img
            src="/images/email-sent.png"
            alt="email-sent-img"
            className="relative left-10"
          />
          <h2 className="text-3xl font-medium text-primary-800">
            Verification Email Sent
          </h2>
          <p className="text-center opacity-80">
            Please click on the link in your email to verify your account.
          </p>
        </div>
      ) : (
        <>
          <Heading
            content="Welcome 👋"
            type="section"
            className="self-start"
          />
          <p className="mb-8 text-sm text-gray-600">
            Today is a new day. It's your day. You shape it. Sign up to start
            managing your projects.
          </p>
          <Form
            navigate={false}
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            action="/signup"
            ref={formRef}
            className="flex flex-col"
          >
            <Input
              label="Full Name"
              name="fullName"
              register={register}
              placeholder="Jane Doe"
              error={errors.fullName?.message as string}
            />
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
            <div className="my-2 flex">
              <input
                {...register('agreeToTerms')}
                type="checkbox"
                id="agree"
                className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="agree"
                className="ml-2 text-sm text-gray-700"
              >
                I agree to the{' '}
                <Link
                  to="#"
                  className="text-blue-500 hover:underline"
                >
                  terms and conditions
                </Link>
                .
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.agreeToTerms.message as string}
              </p>
            )}
            {formError ? (
              <p className="mt-1 py-2 text-sm text-red-700">{formError}</p>
            ) : null}
            <Button
              buttonText={'Sign up'}
              className={`flex-center mt-4`}
              submit
              loading={loading}
            />
          </Form>
        </>
      )}
    </main>
  );
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const fullName = String(formData.get('fullName'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const agreeToTerms = String(formData.get('agreeToTerms'));

  if (!fullName || !email || !password || !agreeToTerms) {
    return { error: 'All fields are required!' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        first_name: fullName.split(' ')[0],
        last_name: fullName.split(' ')[1] || '',
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        verified: false,
      },
    });

    const token = jwt.sign({ email }, process.env.SECRET_KEY || '', {
      expiresIn: '2h', // Token expires in 2 hour
    });

    const verificationLink = `${process.env.BASE_URL}/verify-email/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Hello ${fullName},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });

    return json({
      success: true,
      message: 'Verification Email sent successfully',
    });
  } catch (error) {
    console.error('error', error);
    // unique constraint error
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return json(
        { error: 'This email is already registered.', code: error.code },
        { status: 400 },
      );
    }
    return json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
};
