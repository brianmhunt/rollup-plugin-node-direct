# rollup-plugin-node-direct

Locate modules with Node-style `package.json` files in given directories.

Much like rollup-plugin-node-resolve.

## Alternative

As an alternative to this plugin, consider using node-resolve with `customResolveOptions`, like this:

```
import nodeResolve from 'rollup-plugin-node-resolve'

plugins.push(nodeResolve({jsnext: true, customResolveOptions: {moduleDirectory: "packages"}}))
```

where `plugins` is passed to / returrned as part of the `rollup` config.


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

      skip: [ 'some-big-dependency' ],  // Default: []
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
