import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { Footer, Header } from '~/components';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { LoaderFunctionArgs } from '@remix-run/node';
import prisma from '../../prisma/index';
import { User } from '~/interfaces';
import { ToastContainer } from 'react-toastify';
import { withSentry } from '@sentry/remix';
import * as Sentry from '@sentry/remix';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookies = parse(request.headers.get('Cookie') || '');
  const token = cookies['auth-token'];

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '') as {
      email: string;
    };

    if (!decoded || !decoded.email) {
      return { user: null };
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return { user: null };
    }

    return { user };
  } catch (error) {
    console.error('Error verifying token:', error);

    if (error instanceof jwt.JsonWebTokenError) {
      // Invalid token
      return { user: null };
    }

    if (error instanceof jwt.TokenExpiredError) {
      // Token is expired
      return { user: null };
    }

    return { user: null };
  }
};

export default function HomeLayout() {
  const { user } = useLoaderData<{ user: User | null }>();

  return (
    <div
      data-testid="home-layout"
      style={{
        backgroundImage: `radial-gradient(at center, #FFF9F6, #FFFFFF)
      `,
      }}
    >
      <Header user={user} />
      <Outlet context={[user]} />
      <Footer />
      <ToastContainer limit={1} />
    </div>
  );
}

function ErrorContent() {
  const error = useRouteError();

  Sentry.captureException(error);
  console.log('this');
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex-col-center h-[70vh] w-screen gap-4">
        <h2 className="text-2xl">We're sorry, an error occurred on our end.</h2>
        <p>Details: {error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    Sentry.captureException(error);
    return (
      <div className="flex-col-center h-[60vh] w-full gap-6 italic text-gray-500">
        <img
          src="/images/error.png"
          alt=""
          className="h-72 w-72"
        />
        Oops! {error.message}ee 🍕
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export const ErrorBoundary = withSentry(() => {
  return (
    <div data-testid="home-layout">
      <Header user={null} />
      <main className="h-full w-full">
        <ErrorContent />
      </main>
      <Footer />
    </div>
  );
});
