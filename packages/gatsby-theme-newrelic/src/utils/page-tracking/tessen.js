import createTessen from '../createTessen';
import warning from 'warning';
import getTessenConfig from '../config/tessen';
import { getResolvedEnv } from '../config';
import { canTrack } from '../tracking';

const warnAboutNoop = (pageView) => {
  warning(
    pageView,
    "You have enabled page view tracking, but do not have page view tracking configured. This route change has not been tracked. Please configure the 'tessen.pageView' option in gatsby-config.js"
  );

  warning(
    pageView.name && pageView.category,
    "You have enabled page view tracking, but page view tracking is misconfigured. This route change has not been tracked. Please configure the 'tessen.pageView.name' and 'tessen.pageView.category' options in gatsby-config.js"
  );
};

const canSendPageView = (pageView) =>
  pageView && pageView.name && pageView.category;

const trackViaTessen = ({ location }, themeOptions) => {
  const env = getResolvedEnv(themeOptions);
  const tessenConfig = getTessenConfig(themeOptions);

  if (!tessenConfig || !tessenConfig.trackPageViews) {
    return;
  }

  window.initializeTessenTracking = initializeTessenTracking({
    config: tessenConfig,
    env,
    location,
  });

  window.initializeTessenTracking();

  // wrap inside a timeout to make sure react-helmet is done with its changes (https://github.com/gatsbyjs/gatsby/issues/11592)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      trackPageView({ config: tessenConfig, env, location });
    });
  });
};

const trackPageView = ({ config, env, location }) => {
  const { pageView } = config;
  const {
    name,
    category,
    getProperties = () => ({}),
    ...properties
  } = pageView;

  const tessen = createTessen(config);

  if (!canSendPageView(pageView)) {
    return warnAboutNoop(pageView);
  }

  tessen.page(name, category, {
    ...properties,
    ...getProperties({ location, env }),
  });
};

const initializeTessenTracking = ({ config, env, location }) => (
  options = {}
) => {
  if (canTrack()) {
    const { segmentWriteKey } = config;
    window.Tessen.load(['Segment', 'NewRelic'], {
      Segment: {
        identifiable: true,
        writeKey: segmentWriteKey,
      },
    });

    window.Tessen.identify({});

    options.trackPageView && trackPageView({ config, env, location });
  }
};

export default trackViaTessen;
