import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	plugins: [ buble() ],
	external: [ 'path', 'fs', 'builtin-modules', 'resolve', 'browser-resolve' ],
	targets: [
		{ dest: 'dist/rollup-plugin-node-direct.cjs.js', format: 'cjs' },
		{ dest: 'dist/rollup-plugin-node-direct.es.js', format: 'es' }
	]
};
