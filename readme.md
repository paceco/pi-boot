# PI Boot + Gulp

Front-end framework using Gulp to tie everything together.

### Dependencies:

- Node 4.2.1

**(For Node 0.12 and lower, replace the `package.json` with [the older
version](https://gist.github.com/nathanlong/1bcd85a4511c25d49f15) to ensure
compatibility.)**

### To install:

Requires Node and a global install of Gulp.

Navigate to project in your terminal and run:

    npm install

This will install the node packages. This only has to be performed once during
setup. Then run gulp as normal:

    gulp [task name here]

If you run `gulp` without any tasks specified, it will run the default task.


### Gulp tasks:

|Task Name|Description|
|:--------|:----------|
| default | Builds all sass and js, then kicks off `watch` process |
| sass | compiles sass and autoprefixes for browser support |
| sass-build | compiles sass, autoprefixes, and minifies |
| concat | fires off vendor-concat and  |
| vendor-concat | specifies a list of javascript files to load, preserves order |
| js-concat | specifies a list of custom javascript files to load, preserves order |
| static | moves all static assets to `assets/build` and updates them if there are changes |
| vendor-fonts | specifies a list of all vendor fonts to move to `assets/build/fonts`, this allows third-party files to stay together |
| build | outputs compressed and minified versions of sass and js, used for push hook |
| watch | will watch for any changes in custom files and regenerate on update |


### Basic Structure

All front-end assets are contained within the `/assets/` folder.

There are three subfolders:

- `/assets/build/...` 
	- contains all generated assets, sourcing should happen in this folder.
- `/assets/source/...` 
	- contains all source files for generated assets, all work should happen in
		this folder
- `/assets/static/...`
	- contains all non-processed assets (images, fonts, etc)--things you don't
		want smushed together.
	- this also is where critical js that must load in the head should be placed

The `source` folder, where all the work happens, is also split into three subfolders

- `/assets/source/js/...` 
	- all custom javascript.
- `/assets/source/sass/...` 
	- all custom SASS styles.
- `/assets/source/vendor/...` 
	- all third-party js, css, and sass.


### SASS Structure

We currently follow a loose interpretation of OOCSS (Object Oriented CSS) with
some structure cues from [DOCSSA](http://docssa.info/) and
[SMACSS](https://smacss.com/).

There are three hierarchical structures:

1. Base
	- Contains rules, variables, mixins used throughout the project
2. Components
	- Borrowed from DoCCSa, but much simpler in scope. These are intended to be
		reusable and extendable pieces of code that could be used in a completely
		different project. Basically these will be our 'solved' design patterns.
	- Typically, new rules should not go in here, only reusable patterns that have
		evolved fron the 'layouts' folder.
3. Layouts
	- This is the common working area for a project. All new rules go into
		'layouts' first.
	- These are organized by specific views first (homepage, article, etc) and as
		patterns emerge they will be separated into separate components to be used
		across different sections of the site.

For each section there is a double-underscore master file that collects the
imports for everything in it's grouping (all 'components' are sourced in
`__components.scss`).


### Installing new plugins

To install a new plugin into the project, download files and place them in
`/assets/source/vendor/`.

**For js files:**

- Update the `vendor-concat` task in `gulpfile.js` to include the new plugin.

**For css/scss files:**

- Make sure they have the `.scss` file extension 
- Include in `/assets/source/vendor/__vendor.scss`

### Installing new fonts

There are two ways to introduce new fonts into the framework:

**Standalone:**

Place the font files in `/assets/static/fonts/`. The `static` task will copy
these to `/assets/build/fonts/` and can be sourced from the css as
`../fonts/fontname.otf`, etc

**Vendor:**

If the fonts are included in another package (like Bootstrap) you can leave them
inside their package and source them in the `vendor-fonts` task in the
`gulpfile.js`

This will grab all the fonts you specify and move them into the same location as
the other fonts (`/assets/build/fonts`) for sourcing.

