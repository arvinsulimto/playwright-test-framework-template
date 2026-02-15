module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/*.ts', 'src/support/hooks.ts'],
    paths: ['features/*.feature'],
    format: ['progress-bar'],
    formatOptions: { snippetInterface: 'async-await' },
    worldParameters: {
      headless: process.env.HEADLESS !== 'false'
    },
    timeout: 60000
  }
}; 