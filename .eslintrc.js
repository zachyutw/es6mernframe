module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		es7: true,
		node: true,
		mongo: true,
		mocha: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},
	plugins: [ 'mocha' ],
	rules: {
		'default-case': 0,
		'linebreak-style': [ 'warn', 'unix' ],
		'mocha/no-exclusive-tests': 'error',
		quotes: [ 'none', 'single' ],
		'no-unused-vars': [ 'warn', { args: 'after-used' } ],
		'no-console': 0
	}
};
