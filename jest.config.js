module.exports = {
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@wordpress/block-editor$': '<rootDir>/__mocks__/block-editor.js',
		'^@wordpress/data$': '<rootDir>/__mocks__/data.js',
	},
	setupFilesAfterEnv: [ './src/setupTests.js' ],
};
