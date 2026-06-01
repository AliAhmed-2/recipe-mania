export const handleApiError = (statusCode: number, error: unknown): never => {
  let message = 'An unexpected error occurred.';

  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }

  if (statusCode >= 500) {
    message = 'A server error occurred. Please try again later.';
  } else if (statusCode === 422) {
    message = 'Validation error. Please contact support with this issue.';
  } else if (statusCode === 404) {
    message = 'Resource not found.';
  } else if (statusCode === 402) {
    message = 'Recipe API error.';
  } else if (statusCode === 400) {
    message = 'Invalid request. Please check the data you submitted.';
  } else if (statusCode >= 300 && statusCode < 400) {
    message = 'Redirect error. Please try again.';
  } else if (statusCode >= 100 && statusCode < 200) {
    message = 'Informational error. Please try again.';
  }

  throw new Error(message);
};
