const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/ts/main.ts', 'public/js/main.js');
mix.js('resources/js/plugins.js', 'public/js/plugins.js')
mix.js('resources/js/vendor/modernizr-3.11.2.min.js', 'public/js/vendor/modernizr-3.11.2.min.js')
mix.js('resources/js/app.jsx', 'public/js').react();
mix.copyDirectory('resources/data', 'public/data')
