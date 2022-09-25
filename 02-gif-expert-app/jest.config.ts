import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.ts'],
};

export default config;
