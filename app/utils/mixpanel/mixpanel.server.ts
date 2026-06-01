import mixpanel from 'mixpanel';
// import { UAParser } from 'ua-parser-js';

const mixpanelInstance = mixpanel.init('acb092587918ce79795372d937ab30a9', {
  protocol: 'https',
});

export const mixpanelTrack = (
  eventName: string,
  page: string,
  id: string | number,
  ip: string,
  userAgent: string,
  properties?: Record<string, unknown>,
) => {
  try {
    // const { browser, cpu, device } = UAParser(userAgent);

    mixpanelInstance.track(eventName, {
      distinct_id: id,
      page,
      timestamp: new Date().toISOString(),
      userAgent,
      ip,
      ...properties,
    });
  } catch (error: unknown) {
    console.log(`An unexpected error occured with Mixpanel: ${error}`);
  }
};
