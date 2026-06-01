import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';
import { Logo } from '~/components';

export default function HomeLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
        <div className="mx-auto max-w-md">
          <Outlet />
        </div>
      </div>
      <div className="hidden w-1/2 overflow-hidden rounded-3xl p-2 md:flex">
        <div className="relative flex w-full items-center justify-center bg-auth-pic bg-cover bg-right">
          <div className="absolute h-full w-full bg-black opacity-70"></div>
          <Logo
            size="lg"
            className="relative z-10 cursor-pointer transition-all hover:scale-125"
          />
        </div>
      </div>
    </div>
  );
}

function ErrorContent() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex-col-center h-[70vh] w-screen gap-4">
        <h2 className="text-2xl">We're sorry, an error occurred on our end.</h2>
        <p>Details: {error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <img
          src="/images/error.png"
          alt=""
          width={400}
          height={400}
        />
        Oops! {error.message} 🍕
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function ErrorBoundary() {
  return (
    <div data-testid="home-layout">
      <main className="h-full w-full">
        <ErrorContent />
      </main>
    </div>
  );
}
