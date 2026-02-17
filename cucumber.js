module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/*.ts', 'src/support/hooks.ts'],
    paths: ['features/*.feature'],
    format: [
      'progress-bar',
      'summary',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      externalAttachments: true,
      resultsDir: 'allure-results'
    },
    worldParameters: {
      headless: process.env.HEADLESS !== 'false'
    },
    timeout: 60000
  }
}; 