/*jshint node:true */

module.exports = function( grunt ) {
	'use strict';

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.initConfig({

		clean: [ 'build', 'dist/fonts' ],

		pkg: grunt.file.readJSON( 'package.json' ),

		svgmin: {
			themicons: {
				options: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								convertPathData: false,
								mergePaths: false,
								removeViewBox: false,
								removeUselessStrokeAndFill: false
							}
						}
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
			themicons: {
				src: 'build/*.svg',
				dest: 'dist/fonts',
				destCss: 'dist/css',
				options: {
					codepoints: getCodePoints(),
					destHtml: 'dist/fonts',
					engine: 'node',
					descent: 0,
					font: 'themicons',
					fontFamilyName: 'Themicons',
					hashes: false,
					htmlDemo: true,
					htmlDemoTemplate: 'templates/demo.html',
					ligatures: false,
					normalize: true,
					optimize: false,
					relativeFontPath: '../fonts/',
					round: 0,
					styles: 'font,icon',
					stylesheet: 'css',
					template: 'templates/custom.css',
					templateOptions: {
						'baseClass': 'themicon',
						'classPrefix': 'themicon-'
					},
					order: 'woff2,woff,ttf',
					types: 'ttf,woff,woff2',
					version: '<%= pkg.version %>'
				}
			}
		}

	});

	grunt.registerTask( 'default', [ 'clean', 'svgmin', 'webfont' ] );

	// https://mathiasbynens.be/notes/javascript-unicode
	function getCodePoints() {
		var data, i, icon,
			codePoints = {},
			yaml = require( 'js-yaml' );

		data = yaml.load( grunt.file.read( 'src/icons.yml' ) );

		for ( i in data.icons ) {
			icon = data.icons[ i ];
			codePoints[ icon.id ] = parseInt( icon.unicode, 16 );
		}

		return codePoints;
	}
};
