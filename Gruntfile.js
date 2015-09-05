module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['concat:app'],
			},
			css: {
				files: 'css/**/*.less',
				tasks: ['less:development']
			},
		},
		uglify: {
			development: {
				options: {
					mangle: false,
				},
				files: {

	/*<script type="text/javascript" src="src/common.js"></script>
		<script type="text/javascript" src="src/game_framework.js"></script>
		<script type="text/javascript" src="src/GameObject.js"></script>
		<script type="text/javascript" src="src/sprite.js"></script>
		<script type="text/javascript" src="src/Text.js"></script>
		<script type="text/javascript" src="src/Particle.js"></script>
		<script type="text/javascript" src="src/ParticleEmitter.js"></script>
		<script type="text/javascript" src="src/State.js"></script>
		<script type="text/javascript" src="src/readAJAX.js"></script>*/


		'build/compiled.js': ['src/game_framework.js',
						'src/common.js',
						'src/main.js',
						'src/readAJAX.js',
						'src/GameObject.js',
						'src/sprite.js',
						'src/Text.js',
						'src/Particle.js',
						'src/ParticleEmitter.js',
						'src/State.js',
						'src/**/*.js']
				},
			},
			compressed: {
				options: {
					mangle: true,
					compress: {
						//TODO: Optimize using compressor options (https://github.com/mishoo/UglifyJS2#compressor-options)
					}
				},
				files: {
					'build/compiled.js': ['src/game_framework.js',
						'src/common.js',
						'src/main.js',
						'src/readAJAX.js',
						'src/GameObject.js',
						'src/sprite.js',
						'src/Text.js',
						'src/Particle.js',
						'src/ParticleEmitter.js',
						'src/State.js',
						'src/**/*.js']
				},
			}
		},
		less: {
			development: {
				files: {
					"build/style.css": "css/**/*.less"
				}
			},
			compressed: {
				files: {
					"css/**/*.css": "build/style.css"
				},
				compress: true,
			}
		},
		htmlmin: {
			development: {
				options: {
					removeComments: false,
					collapseWhitespace: false,
				},
				files: {
					'build/index.html': '*.html'
				}
			},
			compressed: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					'build/index.html': '*.html'
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: 'build/game.zip',
					mode: 'zip'
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: './',
					src: ['build/*.css', 'build/*.js', 'build/*.html'],
					dest: './'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');

	var fs = require('fs');
	grunt.registerTask('sizecheck', function() {
		var done = this.async();
		fs.stat('build/game.zip', function(err, zip) {
			if (zip.size > 13312) {
				//If size in bytes greater than 13kb
				grunt.log.error("Zipped file greater than 13kb \x07 \n");
				grunt.log.error("Zip is " + zip.size + " bytes when js13k max is 13,312 bytes");
			}
			done();
		});
	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['uglify:compressed'/*, 'htmlmin:development'*/]);
	grunt.registerTask('build-compress', ['uglify:compressed', 'htmlmin:compressed', 'compress:main', 'sizecheck']);

};