export default ({ config }) => {
  config.version = '49.0.0';
  config.plugins = [
    // @nozbe/watermelonDB simdjson plugin
    './plugins/withSimdjson',
  ];
  return config;
};
