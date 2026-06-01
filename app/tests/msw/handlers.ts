import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/post/:id', () => {
    return HttpResponse.json({
      message: 'Post fetched successfully',
    });
  }),
];

export const worker = setupWorker(...handlers);
