import * as Sentry from '@sentry/remix';
/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import { startTransition, StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import mixpanel from 'mixpanel-browser';

function MixpanelInit() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || true) {
      mixpanel.init('acb092587918ce79795372d937ab30a9', {
        debug: true,
        track_pageview: true,
        persistence: 'localStorage',
      });
    }
  }, []);

  return null;
}

Sentry.init({
  dsn: 'https://4198678edca69b4ba1597683f82de20c@o4508414018650112.ingest.de.sentry.io/4508414027890768',
  tracesSampleRate: 1,

  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches,
    }),
  ],
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <MixpanelInit />
    </StrictMode>,
  );
});
