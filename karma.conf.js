module.exports = function (config) {
  config.set({
    // Define the frameworks to be used for testing
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'viewport'],
    
    // Specify the Karma plugins required for testing
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-viewport'),
      require('karma-spec-reporter')
    ],
    
    // Configure the reporters for test results and code coverage
    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 100,
        lines: 100,
        branches: 100,
        functions: 100
      }
    },
    
    // Disable autoWatch (continuous test execution) and enable singleRun mode
    autoWatch: false,
    singleRun: true,
    
    // Specify the browsers to be used for testing
    browsers: ['ChromeHeadless'],
    
    // Define viewport settings for responsive testing
    viewport: {
      breakpoints: [
        {
          name: "mobile",
          size: {
            width: 360,
            height: 740
          }
        },
        {
          name: "desktop",
          size: {
            width: 1920,
            height: 1080
          }
        }
      ]
    },
    
    // Configure client settings
    client: {
      jasmine: {
        random: false // disable the random running order
      }
    }
  });
};
