/*jshint node:true */

module.exports = function( grunt ) {
	'use strict';

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({

		svgmin: {
			themicons: {
				options: {
					plugins: [
						{ convertPathData: false },
						{ mergePaths: false },
						{ removeViewBox: false },
						{ removeUselessStrokeAndFill: false }
					]
				},
				files: [
					{
						expand: true,
						cwd: 'src/svg',
						src: [ '*.svg' ],
						dest: 'build',
						rename: function( dest, src ) {
							return dest + '/' + src.replace( 'themicons_', '' );
						}
					}
				]
			},
		},

		webfont: {
			audiotheme: {
				src: 'build/*.svg',
				dest: 'dist/fonts',
				destCss: 'dist/css',
				options: {
					codepoints: getCodePoints(),
					destHtml: 'dist/fonts',
					embed: true,
					engine: 'node',
					font: 'themicons',
					hashes: false,
					htmlDemo: true,
					htmlDemoTemplate: 'templates/demo.html',
					ligatures: false,
					relativeFontPath: '../fonts/',
					styles: 'font,icon',
					stylesheet: 'css',
					template: 'templates/custom.css',
					templateOptions: {
						'baseClass': 'themicon',
						'classPrefix': 'themicon-'
					}
				}
			}
		}

	});

	grunt.registerTask( 'default', [ 'svgmin', 'webfont' ] );

	// https://mathiasbynens.be/notes/javascript-unicode
	function getCodePoints() {
		var data, i, icon,
			codePoints = {},
			yaml = require( 'js-yaml' );

		data = yaml.safeLoad( grunt.file.read( 'src/icons.yml' ) );

		for ( i in data.icons ) {
			icon = data.icons[ i ];
			codePoints[ icon.id ] = parseInt( icon.unicode, 16 );
		}

		return codePoints;
	}
};
