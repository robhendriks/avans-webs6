module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			dist: {
				src: 'app/js/app.js',
				dest: 'dist/js/app.js',
				options: {
					external: ['angular'],
					debug: true,
					browserifyOptions: {debug: true}
				}
			}
		},
		sass: {
			dist: {
				files: {
					'dist/css/app.css': 'app/sass/main.scss'
				}
			}
		},
		copy: {
			html: {
				cwd: 'app/',
				expand: true,
				src: '**/*.html',
				dest: 'dist/'
			}
		},
		watch: {
			js: {
				files: 'app/**/*.js',
				tasks: 'browserify'
			},
			sass: {
				files: 'app/**/*.scss',
				tasks: 'sass'
			},
			html: {
				files: 'app/**/*.html',
				tasks: 'copy'
			}
		},
		'http-server': {
			dev: {
				root: './dist',
				port: 3000,
				openBrowser: false,
				runInBackground: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-http-server');

	grunt.registerTask('default', ['browserify', 'sass', 'copy', 'http-server', 'watch']);

};
