module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// Compress and concat js files.
		uglify: {
			concat: {
				files: {
					"<%= buildPath %>assets/js/fm.min.js": "<%= dom_munger.data.jsAssets %>"
				}
			}
		},

		// Merge assets links in html code.
		dom_munger: {
			js: {
				options: {
					read: {selector: "script", attribute: "src", writeto: "jsAssets", isPath: true}
				},
				src: "<%= rootPath %>index.html"
			},
			css: {
				options: {
					read: {selector: "link", attribute: "href", writeto: "cssAssets", isPath: true}
				},
				src: "<%= rootPath %>index.html"
			}
		},

		// Compress and concat css files.
		concat: {
			css: {
				src: "<%= dom_munger.data.cssAssets %>",
				dest: "<%= buildPath %>assets/css/fm.min.css"
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: "<%= buildPath %>assets/css/",
				src: ["fm.min.css"],
				dest: "<%= buildPath %>assets/css/",
				ext: ".min.css"
			}
		},

		// Compress html files.
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				keepClosingSlash: true,
				processScripts: ["text/x-custom-template"]
			},
			dist: {
				files: {
					"<%= buildPath %>index.html": "<%= buildPath %>index.html"
				}
			}
		},

		// Process tech comments in html files.
		processhtml: {
			dev: {
				files: {
					"<%= buildPath %>index.html": ["<%= rootPath %>index.html"]
				}
			}
		},

		// Check code style rules.
		jshint: {
			options: {
				jshintrc: "../jshint/.jshintrc",
				reporter: require("jshint-stylish")
			},
			all: [
				"<%= appPath %>**/*.js",
				"<%= assetPath %>js/*.js",
				"!<%= assetPath %>js/*.min.js"
			]
		},

		// Copy assets to build directory.
		copy: {
			images: {
				expand: true,
				flatten: true,
				cwd: "<%= rootPath %>",
				src: ["assets/**/img/*"],
				dest: "<%= buildPath %>assets/img/",
				filter: "isFile"
			},
			libraries: {
				expand: true,
				flatten: true,
				cwd: "<%= rootPath %>",
				src: ["assets/**/libs/*"],
				dest: "<%= buildPath %>assets/libs/",
				filter: "isFile"
			}
		},

		// Clean build folder.
		clean: {
			build: {
				options: {
					force: true
				},
				src: ["<%= buildPath %>"]
			}
		},

		// Replace substrings in files by pattern.
		"string-replace": {
			"fm.min.js": {
				files: {
					"<%= buildPath %>assets/js/": "<%= buildPath %>assets/js/*"
				},
				options: {
					replacements: [
						{
							pattern: "/config/config.js",
							replacement: "/config/config.js"
						}
					]
				}
			},
			"index.html": {
				files: {
					"<%= buildPath %>": "<%= buildPath %>index.html"
				},
				options: {
					replacements: [
						{
							pattern: "assets/libs/lib.min.js",
							replacement: "assets/libs/lib.min.js"
						}
					]
				}
			}
		},

		// Path variables.
		assetPath: "../../assets/",
		appPath: "../../app/",
		buildPath: "../../build/",
		rootPath: "../../"
	});

	// Load the plugins that provides the "default" task.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-htmlmin");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-dom-munger");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-processhtml");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-string-replace");

	//Internal tasks
	grunt.registerTask("grabSrcsFromHTML", function () {
		var dom_munger = grunt.config.get("dom_munger");
		for (var i = 0; i < dom_munger.data.jsAssets.length; i++) {
			if (dom_munger.data.jsAssets[i].indexOf("//") > -1) {
				dom_munger.data.jsAssets.splice(i, 1);
				i--;
			}
		}
		grunt.config("dom_munger.data.jsAssets", dom_munger.data.jsAssets);
	});

	grunt.registerTask("mergeAssets", [
		"copy:images",
		"copy:libraries"
	]);

	grunt.registerTask("productionCompile", [
		"string-replace:fm.min.js",
		"string-replace:index.html"
	]);

	// Default task(s).
	grunt.registerTask("default", [
		"clean",
		"jshint",
		"dom_munger:js",
		"grabSrcsFromHTML",
		"uglify",
		"dom_munger:css",
		"concat:css",
		"cssmin:minify",
		"processhtml",
		"htmlmin",
		"mergeAssets",
		"productionCompile"
	]);
};
