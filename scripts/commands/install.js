#!/usr/bin/env node
const { existsSync, copyFileSync, mkdirSync } = require('fs');
const { join } = require('path');
const { getWidgets } = require('../utils/get-widgets');
const { name: resourcesPackagePath } = require('../../package.json');

/**
 * @param {string} widgetName
 */
exports.install = widgetName => {
	const widget = Array.from(getWidgets()).find(
		({ name }) => name === widgetName,
	);
	if (!widget) {
		throw new Error(`Unknown widget: ${widgetName}`);
	}

	const resourcesPath = 'resources';
	if (!existsSync(resourcesPath)) {
		throw new Error(`Invalid resources path: ${resourcesPath}`);
	}

	const targetWidgetsPath = join(resourcesPath, resourcesPackagePath);
	if (!existsSync(targetWidgetsPath)) {
		mkdirSync(targetWidgetsPath);
	}

	const targetWidgetPath = join(targetWidgetsPath, widgetName);
	if (!existsSync(targetWidgetPath)) {
		mkdirSync(targetWidgetPath);
	}

	for (const fileName of widget.files) {
		if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
			continue;
		}

		copyFileSync(join(widget.path, fileName), join(targetWidgetPath, fileName));
	}

	process.stdout.write(
		[
			`Widget ${widgetName} installed in your project.`,
			`To use it from:`,
			`\t- resources/: add something like <link rel="import" href="${resourcesPackagePath}/${widgetName}/index.gui" /> to your <defs>`,
			`\t- app/: import it from '${widgetName}/dist/${widgetName}'`,
		].join('\n'),
	);
};
