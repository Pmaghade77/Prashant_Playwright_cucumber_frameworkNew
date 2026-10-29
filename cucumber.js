
module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],

    require: [
      'src/step-definitions/**/*.ts',
      'src/Support/**/*.ts'
    ],

    requireModule: ['ts-node/register'],

    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],

    formatOptions: {
      resultsDir: 'allure-results'
    }
  }
};
