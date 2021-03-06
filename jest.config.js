module.exports = {
    preset: '@shelf/jest-dynamodb',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
        },
    },
    testRegex: '(/__tests__/*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transformIgnorePatterns: ['<rootDir>/(node_modules)/'],
    modulePaths: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testURL: 'http://localhost/',
}
