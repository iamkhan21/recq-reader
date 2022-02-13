const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");

module.exports = {
	plugins: [
		require("postcss-nested"),
		require("postcss-preset-env"),
		require("postcss-import"),
		require("autoprefixer"),
		postcssJitProps(OpenProps),
	],
};
