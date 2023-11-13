module.exports = {
  // Extends other Stylelint configuration presets for SCSS.
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-clean-order/error", // Extends a configuration for clean ordering of CSS properties with error reporting.
    "stylelint-stylistic"
  ],

  // Specifies the plugins used by this Stylelint configuration.
  plugins: [
    "stylelint-stylistic"
  ],

  // Defines the specific rules and their configurations.
  rules: {
    "stylistic/no-missing-end-of-source-newline": true,
    "media-feature-range-notation": null
  }
};
