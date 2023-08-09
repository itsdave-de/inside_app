module.exports = function (api) {
	api.cache(true);
	return {
	  presets: ["babel-preset-expo"],
	  plugins: [
		"@realm/babel-plugin",
		[
		  "@babel/plugin-proposal-decorators",
		  { legacy: true }
		],
		"expo-router/babel",
		"react-native-reanimated/plugin",
	  ],
	};
  };
