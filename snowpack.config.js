/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
    ['snowpack-plugin-cdn-import',
      {
        dependencies: require('./package.json').dependencies,
        ignore: ['@some/module', /^@another/],
        baseUrl: 'https://cdn.skypack.dev', // default value.
        extensions: ['.js', '.jsx', '.tsx', '.ts'], // default value.
        enableInDevMode: false, // default value.
        formatImportValue: ({ baseUrl, dependency }) =>
          `${baseUrl}/${dependency.name}@${dependency.version}`, // default value.
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    // "source": "remote"
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
