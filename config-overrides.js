// config-overrides.js
module.exports = {
  webpack: (config) => {
    // leave webpack as-is
    return config;
  },

  // override CRA's devServer config to force safe values
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);

      // Force valid host/allowedHosts regardless of env
      config.host = "localhost";
      config.allowedHosts = "all";

      // (Optional) keep websocket URL working if HOST/PORT are customized
      if (config.client && config.client.webSocketURL) {
        config.client.webSocketURL.hostname = "localhost";
      }

      return config;
    };
  },
};
