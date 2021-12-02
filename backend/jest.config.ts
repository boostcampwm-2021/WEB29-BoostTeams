module.exports = {
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest'
	},
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@src/(.*)$': '<rootDir>/src/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
		'^@entities/(.*)$': '<rootDir>/src/entities/$1',
		'^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
		'^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
		'^@passport/(.*)$': '<rootDir>/src/passport/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@sockets/(.*)$': '<rootDir>/src/sockets/$1',
		'^@redis/(.*)$': '<rootDir>/src/redis/$1',
		'^@customeTypes/(.*)$': '<rootDir>/src/customeTypes/$1'
	},
	testMatch: [
		'<rootDir>/**/*.test.(js|jsx|ts|tsx)',
		'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
	],
	transformIgnorePatterns: ['<rootDir>/node_modules/']
};
