import { Link, MetaFunction, useLoaderData } from '@remix-run/react';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/index';

export const meta: MetaFunction = () => {
  return [
    { title: 'Email Verification | Recipe Mania' },
    {
      name: 'description',
      content:
        'Welcome to Recipe Mania, your one-stop solution where you can browse recipes from around the world, get recipe scores and filter recipes according to your need and diet!',
    },
  ];
};

export const loader = async ({ params }: { params: { token: string } }) => {
  const { token } = params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as {
      userId: string;
      email: string;
    };

    await prisma.user.update({
      where: { email: decoded.email },
      data: { verified: true },
    });

    // Redirect to a success page or login page
    return { success: true };
  } catch (error) {
    console.error('Verification error', error);
    // Handle token expiration or invalid token
    return { success: false };
  }
};

export default function VerifyEmail() {
  const { success } = useLoaderData<{ success: boolean }>();

  if (success) {
    return (
      <main
        id="verify-email"
        className="flex flex-col px-6"
      >
        <div className="flex-col-center gap-4">
          <img
            src="/images/account-created.png"
            alt="account-created-img"
          />
          <h2 className="text-3xl font-medium text-primary-800">
            Email Verified!
          </h2>
          <p className="opacity-80">
            You can login to your account{' '}
            <Link
              className="font-medium text-primary-800 underline"
              to={'/login'}
            >
              here
            </Link>
          </p>
        </div>
      </main>
    );
  } else {
    throw new Error(
      "Your token doesn't seem to be valid, please contact support",
    );
  }
}
