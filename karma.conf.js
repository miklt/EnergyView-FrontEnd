module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'viewport'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-viewport')
    ],
    reporters: ['progress', 'coverage-istanbul'],
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
    autoWatch: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
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
    }
  });
};