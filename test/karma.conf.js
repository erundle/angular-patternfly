
module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'lib/patternfly/components/jquery/dist/jquery.js',
      'lib/patternfly/components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
      'lib/patternfly/components/bootstrap-select/js/bootstrap-select.js',
      'lib/patternfly/components/d3/d3.js',
      'lib/patternfly/components/c3/c3.js',
      'lib/angular/angular.js',
      'lib/angular-sanitize/angular-sanitize.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/i18next/i18next.js',
      'lib/ng-i18next/dist/ng-i18next.js',
      'lib/lodash/lodash.js',
      'lib/karma-read-json/karma-read-json.js',
      'misc/test-lib/helpers.js',
      'src/**/*.module.js',
      'src/**/*.js',
      'src/**/*.html',
      'test/utils/*.js',
      'test/**/*.spec.js',
      { pattern: 'i18n/**/*.json', watched: true, served:  true, included: false }
    ],

    // list of files to exclude
    exclude: [
      'client/main.js'
    ],

    preprocessors: {
      'src/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/'
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'junit'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: 'test/test-results.xml'
    },

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500
  });
};
