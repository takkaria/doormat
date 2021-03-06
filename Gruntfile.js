module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		concat: {
			options: {
				separator: ';',
			},
			main: {
				src: [ 'js/src/jquery*.js', 'js/src/*.js' ],
				dest: 'js/<%= pkg.name %>.js',
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
			},
			dist: {
				files: { 'js/<%= pkg.name %>.js': 'js/<%= pkg.name %>.js' }
			}
		},

		sass: {
			main: {
				options: {
					'style': 'compact',
				},
				files: {
					'css/echo.css': 'scss/echo.scss'
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'css/echo.css': 'css/echo.css'
				}
			}
		},

		watch: {
			scripts: {
				files: ['<%= concat.main.src %>'],
				tasks: ['concat']
			},
			scss: {
				files: ['<%= sass.main.files %>'],
				tasks: ['sass']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'sass']);
	grunt.registerTask('dist', ['concat', 'uglify', 'sass', 'cssmin']);
};
