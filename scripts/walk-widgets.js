#!/usr/bin/env node
const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');

exports.walkWidgets = function* () {
	for (const name of readdirSync('src')) {
		const path = join('src', name);
		if (!lstatSync(path).isDirectory()) {
			continue;
		}

		yield {
			name,
			path,
		};
	}
};
