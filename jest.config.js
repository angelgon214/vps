module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/test/**/*.test.js'],
    collectCoverageFrom: [
        'src/**/*.js',
        'routes/**/*.js',
        'controllers/**/*.js'
    ]
};
