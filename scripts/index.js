#!/usr/bin/env node
const { installWidget } = require('./install-widget');
const {readFileSync} = require('fs');
const {join} = require('path')

const [, , widgetName] = process.argv;

try {
	installWidget(widgetName);
	const {name} = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
	process.stdout.write([
		`Widget ${widgetName} installed in your project.`,
		`To use it from:`,
		`\t- .gui: add something like <link rel="import" href="fitbit-widgets/${widgetName}/index.gui" /> to your <defs>`,
		`\t- .ts or .js: import it from '${name}/dist/${widgetName}'`
	].join('\n'));
} catch (e) {
	process.stderr.write(e.message);
}
