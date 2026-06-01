import * as Sentry from '@sentry/remix';

Sentry.init({
  dsn: 'https://4198678edca69b4ba1597683f82de20c@o4508414018650112.ingest.de.sentry.io/4508414027890768',
  tracesSampleRate: 1,
  autoInstrumentRemix: true,
});
