import fs from 'fs';
import path from 'path';


function get_resolved_include (root, subdir, target) {
  let pkg
  const pPath = path.join(root, subdir, target, 'package.json')
  try {
    pkg = JSON.parse(fs.readFileSync(pPath))
  } catch (e) { return }

  const indicated = pkg['jsnext:main'] || pkg.main || pkg.browser;

  if (typeof indicated === 'string') {
    return path.join(root, subdir, target, indicated);
  }
}


export default function nodeResolve ( options = {} ) {
  const paths = options.paths;
  const root = options.root || process.cwd();
	const skip = options.skip || [];

	return {
		name: 'node-direct',

		resolveId ( importee, importer ) {
			if (
        !importer || // entry module
        /\0/.test( importee ) ||  // belongs to another plugin
        skip.includes(importee)
      ) {
        return null;
      }

			return new Promise( ( accept /*, reject */ ) => {
        for (let i = 0, j = paths.length ; i < j ; ++i) {
          const resolved = get_resolved_include(root, paths[i], importee);
          if (resolved) {
            accept( resolved );
            return
          }
        }
			});
		}
	};
}
