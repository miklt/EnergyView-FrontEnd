module.exports = {
  // Extends other Stylelint configuration presets for SCSS.
  extends: [
    "stylelint-config-standard-scss", // Extends the standard SCSS configuration.
    "stylelint-config-clean-order/error", // Extends a configuration for clean ordering of CSS properties with error reporting.
    "stylelint-stylistic" // Extends a stylistic configuration for additional style rules.
  ],

  // Specifies the plugins used by this Stylelint configuration.
  plugins: [
    "stylelint-stylistic" // The "stylelint-stylistic" plugin is used to provide additional stylistic rules.
  ],

  // Defines the specific rules and their configurations.
  rules: {
    "stylistic/no-missing-end-of-source-newline": true, // Enforces the presence of a newline at the end of a SCSS file.
    "media-feature-range-notation": null
  }
};
