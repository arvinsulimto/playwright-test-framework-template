module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/*.ts', 'src/support/hooks.ts'],
    paths: ['features/*.feature'],
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter',
      'summary'
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      externalAttachments: true
    },
    worldParameters: {
      headless: process.env.HEADLESS !== 'false'
    },
    timeout: 60000
  }
}; 