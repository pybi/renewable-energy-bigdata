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
mix.js('resources/js/bootstrap.bundle.min.js', 'public/js/bootstrap.bundle.min.js');
mix.js('resources/js/template.js', 'public/js/template.js');
mix.ts('resources/ts/app.ts', 'public/js/app.js');
mix.ts('resources/ts/editing.ts', 'public/js/editing.js');
mix.ts('resources/ts/start.ts', 'public/js/start.js');

mix.sass('resources/sass/app.scss', 'public/css/app.css')
mix.sass('resources/sass/start.scss', 'public/css/start.css')
mix.sass('resources/sass/template.scss', 'public/css/template.css')
mix.sass('resources/sass/editing.scss', 'public/css/editing.css')
mix.sass('resources/sass/pages.scss', 'public/css/pages.css')
mix.sass('resources/sass/printer.scss', 'public/css/printer.css')
