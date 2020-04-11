#!/usr/bin/env node
const { existsSync, copyFileSync, mkdirSync, readdirSync } = require('fs');
const { join } = require('path');

/**
 * @param {string} widgetName
 */
exports.installWidget = widgetName => {
	const widgetSourcePath = join(__dirname, '../', 'dist', widgetName);
	if (!existsSync(widgetSourcePath)) {
		throw new Error(`Unknown widget "${widgetName}"`);
	}

	const resourcesPath = 'resources';
	if (!existsSync(resourcesPath)) {
		throw new Error(`Invalid resources path: ${resourcesPath}`);
	}

	const widgetsPath = join(resourcesPath, 'fitbit-widgets');
	if (!existsSync(widgetsPath)) {
		mkdirSync(widgetsPath);
	}

	const widgetPath = join(widgetsPath, widgetName);
	if (!existsSync(widgetPath)) {
		mkdirSync(widgetPath);
	}

	for (const fileName of readdirSync(widgetSourcePath)) {
		if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
			continue;
		}

		copyFileSync(join(widgetSourcePath, fileName), join(widgetPath, fileName));
	}
};
