require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    repository: 'https://github.com/newrelic/gatsby-theme-newrelic',
    siteUrl: 'https://developer.newrelic.com',
    utmSource: 'demo-site',
    branch: 'develop',
  },
  plugins: [
    {
      resolve: '@newrelic/gatsby-theme-newrelic',
      options: {
        i18n: {
          additionalLocales: [{ name: 'Japanese', locale: 'jp' }],
        },
        layout: {
          contentPadding: '2rem',
          maxWidth: '1480px',
        },
        newrelic: {
          configs: {
            staging: {},
            production: {},
          },
        },
        splitio: {
          // Mocked features only used when in localhost mode
          // https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#localhost-mode
          features: {
            'developer-website_global-header-gh-buttons': 'on',
          },
          core: {
            authorizationKey: process.env.SPLITIO_AUTH_KEY || 'localhost',
          },
        },
        gaTrackingId: 'UA-3047412-33',
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/layouts'),
      },
    },
    'gatsby-plugin-mdx',
  ],
};
