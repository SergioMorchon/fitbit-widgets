#!/usr/bin/env node
const { copyFileSync, readdirSync, lstatSync } = require('fs');
const { join } = require('path');

for (const widgetName of readdirSync('src')) {
	if (!lstatSync(join('src', widgetName)).isDirectory()) {
		continue;
	}

	for (const file of readdirSync(join('src', widgetName))) {
		if (file.endsWith('.ts')) {
			continue;
		}

		copyFileSync(join('src', widgetName, file), join('dist', widgetName, file));
	}
}
