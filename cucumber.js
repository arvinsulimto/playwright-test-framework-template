module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/steps/*.ts', 'src/utils/hooks.ts'],
    paths: ['src/features/*.feature'],
    format: ['progress-bar'],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: {
      headless: process.env.HEADLESS !== 'false'
    },
    timeout: 60000
  }
}; 