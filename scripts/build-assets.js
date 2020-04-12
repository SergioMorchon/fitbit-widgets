#!/usr/bin/env node
const { copyFileSync, readdirSync, lstatSync } = require('fs');
const { join } = require('path');

for (const widgetName of readdirSync('src')) {
	if (!lstatSync(join('src', widgetName)).isDirectory()) {
		continue;
	}

	for (const file of readdirSync(join('src', widgetName))) {
		const fileSourcePath = join('src', widgetName, file);
		if (file.endsWith('.ts') || lstatSync(fileSourcePath).isDirectory()) {
			continue;
		}

		copyFileSync(fileSourcePath, join('dist', widgetName, file));
	}
}
