#!/usr/bin/env node
const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');
/**
 * @param {string} root
 * @return {Generator<string>}
 */
function* walkFiles(root) {
	for (const file of readdirSync(root)) {
		const path = join(root, file);
		if (lstatSync(path).isDirectory()) {
			yield* walkFiles(path);
		}

		yield path;
	}
}

exports.walkFiles = walkFiles;
