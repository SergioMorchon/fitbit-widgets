#!/usr/bin/env node
const { execSync } = require('child_process');
const { existsSync, copyFileSync, mkdirSync } = require('fs');
const { join } = require('path');
const { getWidgets } = require('../get-widgets');
const pkg = require('../../package.json');

const resourcesPackagePath = pkg.name;

/**
 * @param {string} str
 */
const snakeToCamel = str =>
	str.replace(/([-_][a-z])/g, group =>
		group.toUpperCase().replace('-', '').replace('_', ''),
	);

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

	execSync(`npm install --save ${pkg.name}@${pkg.version}`, {
		stdio: 'inherit',
	});

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
			`\t- resources/: <link rel="import" href="${resourcesPackagePath}/${widgetName}/index.gui" /> to your <defs>`,
			`\t- app/: import * as ${snakeToCamel(widgetName)} from '${
				pkg.name
			}/dist/${widgetName}'\n`,
		].join('\n'),
	);
};
