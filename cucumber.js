module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/*.ts', 'src/support/hooks.ts'],
    paths: ['features/*.feature'],
    format: [
      'summary',
      ['allure-cucumberjs/reporter', 'reports/allure-results/allure-output.txt']
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      resultsDir: 'reports/allure-results'
    },
    worldParameters: {
      headless: process.env.HEADLESS !== 'false'
    },
    timeout: 60000
  }
}; 