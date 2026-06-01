import { redirect } from '@remix-run/node';

export const action = async () => {
  return redirect('/', {
    headers: {
      'Set-Cookie':
        'auth-token=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/',
    },
  });
};

export const loader = () => {
  return redirect('/');
};
