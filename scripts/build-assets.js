#!/usr/bin/env node
const { copyFileSync, readdirSync, lstatSync } = require('fs');
const { join } = require('path');
const { walkWidgets } = require('./walk-widgets');

for (const { name, path } of walkWidgets()) {
	for (const file of readdirSync(path)) {
		const fileSourcePath = join(path, file);
		if (file.endsWith('.ts') || lstatSync(fileSourcePath).isDirectory()) {
			continue;
		}

		copyFileSync(fileSourcePath, join('dist', name, file));
	}
}
