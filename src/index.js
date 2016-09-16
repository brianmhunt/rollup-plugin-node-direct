/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';

function log ( ...args ) {
  console.log('🔌  rollup-plugin-node-direct: ', ...args)
}


function get_resolved_include (root, subdir, target, verbose) {
  let pkg

  if (path.isAbsolute(subdir)) {
    root = ''
  }
  const pPath = path.join(subdir, target, 'package.json');

  try {
    pkg = JSON.parse(fs.readFileSync(pPath))
    const indicated = pkg['jsnext:main'] || pkg.main || pkg.browser;

    if (typeof indicated === 'string') {
      return path.join(root, subdir, target, indicated);
    }
  } catch (e) { /**/ }

  if (verbose) log('🔴', target, 'not found as', pPath)
}


export default function nodeResolve ( options = {} ) {
  const paths = options.paths;
  const root = options.root || process.cwd();
	const skip = options.skip || [];
  const verbose = options.verbose;
  if (verbose) log('Paths:', options.paths)

	return {
		name: 'node-direct',

		resolveId ( importee, importer ) {
			if (
        !importer || // entry module
        /\0/.test( importee ) ||  // belongs to another plugin
        skip.includes(importee) ||
        importee.endsWith('.js') || // Packages don't end in .js.
        importee.startsWith('.') // Packages aren't relative.
      ) {
        return null;
      }
      if (verbose) log(importer, 'asked for', importee)

			return new Promise( ( accept /*, reject */ ) => {
        for (let i = 0, j = paths.length ; i < j ; ++i) {
          const resolved = get_resolved_include(root, paths[i], importee, verbose);
          if (resolved) {
            if (verbose)
              log('✅', importer, 'asked for', importee, 'and gets', resolved)
            accept( resolved );
            return
          }
        }
        accept( null );
			});
		}
	};
}
