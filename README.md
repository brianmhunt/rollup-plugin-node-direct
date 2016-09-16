# rollup-plugin-node-direct

Locate modules with Node-style `package.json` files in given directories.

Much like rollup-plugin-node-resolve.

## Installation

```bash
npm install --save-dev rollup-plugin-node-direct
```

## Usage

```js
import { rollup } from 'rollup';
import nodeDirect from 'rollup-plugin-node-direct';

rollup({
  entry: 'main.js',
  plugins: [
    nodeResolve({
      paths: [ '../where-the-modules-are' ],

      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: true

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'. Local and relative imports
      // can be skipped by giving the full filepath. E.g.,
      // `path.resolve('src/relative-dependency.js')`
      skip: [ 'some-big-dependency' ],  // Default: []

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']      
    })
  ]
}).then( bundle => bundle.write({ dest: 'bundle.js', format: 'iife' }) );

// alongside rollup-plugin-commonjs, for using non-ES6 third party modules
import commonjs from 'rollup-plugin-commonjs';

rollup({
  entry: 'main.js',
  plugins: [
    nodeDirect({ paths: [ '../modules' ] }),
    commonjs()
  ]
}).then(bundle => bundle.write({
  dest: 'bundle.js',
  moduleName: 'MyModule',
  format: 'iife'
})).catch(err => console.log(err.stack));
```


## License

MIT
