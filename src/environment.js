//* environment.js
import Constants from "expo-constants";
const { manifest } = Constants;

const inProduction = !__DEV__;
const inExpo = Constants.manifest && Constants.manifest.debuggerHost;
const inBrowser = window.document && typeof window.document !== 'undefined';
const apiDomain =
  inProduction ? 'production.com'
    : inExpo ? `http://${manifest.debuggerHost.split(':').shift()}:8080`
      : inBrowser ? 'http://localhost:8080'
        : 'unknown';

const ENV = {
  dev: {
    apiDomain: apiDomain
  },
  staging: {
    apiDomain: "[your.staging.api.here]",
  },
  prod: {
    apiDomain: "[your.production.api.here]",
    // Add other keys you want here
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;