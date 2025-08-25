// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // opcional: si quieres que jest busque archivos .ts/.tsx automáticamente
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
