export default {
    default: {
      require: [
        'features/step-definitions/**/*.js',
        'features/support/**/*.js'
      ],
      format: ['progress', 'json:reports/cucumber_report.json'], // 🟡 JSON output

      paths: ['features/**/*.feature'],
      parallel: 1,
      publishQuiet: true
    }
  };
  



  