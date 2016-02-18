# MB File Manager

File manager implementation using Backbone.js framework and jQuery, Bootstrap third-party components.

## Installation

Local environment configuration process description (for developers only):

1. Install `node.js` to be able to use `npm` and `grunt` in future.
	* Download latest stable version of `node.js` using https://nodejs.org/download/ link and install it.
	* Check if the `node.js` installation has been successful, run "`node -v`" command in `cmd`.
	* Check if `npm` installation has been successful, run "`npm -v`" command in `cmd`.
2. Install `grunt` and other node modules as local project modules.
	* Open `cmd` in `<project root>/tools/grunt` directory.
	* Download `npm` dependencies, run "`npm install`" in `cmd`.
	* Install `grunt` as local project module, run "`npm install -g grunt-cli`" in `cmd`.
	* Check if `grunt` installation has been successful , run "`grunt -version`" command in `cmd`.
3. Dive into development.

## Usage

* Open `<project root>/index.html` file in browser to see the application in work (non-minified version). 
* Minified version of project - TBD. 

## Project structure

* `/src` - contains application core files and all front-end business logic of the application;
    * `/modules` - contains application core modules, organized with a separate directory;
		* `/<module-name>` - contains all modules business logic and js code;
    * `application.js` - is the main file of the application core;
* `/assets` - contains all static sources, which could be hardly cached on server (knowing that they will not be changed
very often);
	* `/common` - contains all global application assets;
		* `/config` - contains application client config files;
		* `/css` - contains application style files which have been used for the whole application styling (markup);
		* `/img` - contains application images files which have been used for the whole application styling (markup);
		* `/js` - contains js scripts which have been used for proper application workflow;
			* `init.js` - is the initialization JavaScript file which is used for pageLoad event handling, contains all
			initialization application code;
		* `/libs` - contains all third-party libraries, used in the application;
	* `/<module-name>` - contains all modules assets;
* `/build` - contains minified sources of the application, concatenated into separate files;
* `/tools` - contains all build utilities config files, modules, scripts;
* `build.bat` - file contains commands for grunt build tool for the application build procedure;
* `index.html` - root file of the application, contains all markup and templates definitions (if needed). Non compressed
version of the file should be used.

## Contributing

0. Update head version of project sources from Git repository.
1. Create a new folder in `/src/modules` directory for components business logic.
2. Create a new folder in `/assets` directory for all assets of component.
3. Add module initialization calls to `/assets/common/js/init.js` or `/src/application.js` file.
4. Add module files loading to `<project root>/index.html` (project root) file. Grunt dependency will be done automatically.
5. Check that the application works correctly by opening `<project root>/index.html` file.
6. Run `<project root>/build.bat` file.
7. Check that the application works correctly by opening `<project root>/build/index.html` file.
8. Commit all changes to Git repository or create new pull request if you don't have required rights. 

## Repository
Public Git repository could be found by the following link: https://github.com/oprohonnyi/backbone

## History

* 13.02.2016 - Readme file draft is created by oprohonnyi.
* 14.02.2016 - Readme file information is updated by oprohonnyi.

## License

Licensed under Apache 2.0 license

Copyright (c) 2016 oprohonnyi