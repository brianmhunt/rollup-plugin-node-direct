const assert = require( 'assert' );
const rollup = require( 'rollup' );
const nodeDirect = require( '..' );

process.chdir( __dirname );

function executeBundle ( bundle ) {
	const generated = bundle.generate({
		format: 'cjs'
	});

	const fn = new Function ( 'module', 'exports', 'assert', generated.code );
	const module = { exports: {} };

	fn( module, module.exports, assert );

	return module;
}


describe.only( 'rollup-plugin-node-direct', function () {
  it( 'imports from jsnext:main', () =>
    rollup.rollup({
      entry: 'spec/entry-A.js',
      plugins: [
        nodeDirect({ paths: ['path'], skip: ['vlq'] })
      ]
    }).then( executeBundle ).then( module => {
      assert.equal( module.exports, '4H' );
    })
  );
});
