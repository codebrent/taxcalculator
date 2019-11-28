//jshint strict: false
module.exports = function(config) {
  config.set({
    files: [
      'app/TaxService.js',
      'app/*.spec.js'
    ],
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};
