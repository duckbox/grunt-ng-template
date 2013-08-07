# grunt-ng-template

> A Grunt plugin to take external angular templates and put them inline to the main app file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ng-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ng-template');
```

## The "ng_template" task

### Overview
In your project's Gruntfile, add a section named `ng_template` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ng_template: {

    // The directory of your views
    files : ['app/views'],

    options: {
      
      // The directory of your app
      appDir : 'app',

      // The main html file to place your inline templates
      indexFile : 'index.html'

      // Default set to false
      concat : true

    }

  },
})
```

The above configuration will take your external views from `app/views` and place them into the bottom of `app\index.html`. The plugin needs the directory name of your app and the main app file seperately, so it can ensure it writes the correct script ids ( urls ) for Angular.js to use.