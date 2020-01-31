module.exports = {
    // preset: 'ts-jest/presets/js-with-ts',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
        },
    },
    // testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    testRegex: '(/__tests__/*|(\\.|/)spec)\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'js', 'json'],
    transformIgnorePatterns: ['<rootDir>/(node_modules)/'],
    modulePaths: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testURL: 'http://localhost/',
}
