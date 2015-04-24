# PI Boot + Gulp

Front-end framework using Gulp to tie everything together.

### To install:

Install node

    brew install node

Install gulp (only if you have node, but not gulp):

    npm install --global gulp

Install gulp and all its dependencies into the project (pulls from package.json):

    npm install

Then run gulp as normal:

    gulp [task name here]

### Current Tasks:

|Task Name|Description|
|:--------|:----------|
|default (no argument, just `gulp`) | Builds all sass and js, then kicks off `watch` process |
| sass | compiles sass and autoprefixes for browser support |
| sass-build | compiles sass, autoprefixes, and minifies |
| concat | concatenates all js |
| watch  | watches for changes in sass and js, then recompiles/concatenates |
| build | outputs compressed and minified versions of sass and js, used for push hook |

### File Structure

```bash
assets
¦
+---build
¦   ¦  #all generated files, this folder should not be in version control
¦   ¦  *
+---src
¦   ¦   #all source files, where the work happens
¦   +---js
¦   ¦   +---plugins
¦   ¦   ¦   * #anything in here gets bundled automatically
¦   ¦   main.js #all custom js + bundled js
¦   +---sass
¦   ¦   +---base #variables, mixins, setup
¦   ¦   +---bootstrap #flattened bootstrap modules
¦   ¦   +---components #pattern that are reused
¦   ¦   +---layouts #page-specific styles
¦   ¦   +---vendor #3rd party css to be bundled
¦   ¦   main.scss
+---static
    ¦   #all files that do not need processing and can be sourced as is
    +---fonts #icon fonts, etc
    +---img #sprites, 
    +---js #javascript that should not be bunded, ie modernizr or respond.js
    ¦  #any folder placed in here will be moved into the build folder
