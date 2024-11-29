module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/*.test.(ts|tsx)"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    transformIgnorePatterns: ["/node_modules/"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
    coverageReporters: ["html", "text"],
};
