const { readdirSync, lstatSync } = require('fs');
const { join } = require('path');

const widgetsPath = join(__dirname, '..', 'dist');

exports.getWidgets = function* () {
	for (const widgetName of readdirSync(widgetsPath)) {
		const widgetPath = join(widgetsPath, widgetName);
		if (!lstatSync(widgetPath).isDirectory()) {
			continue;
		}

		yield {
			name: widgetName,
			path: widgetPath,
			files: readdirSync(widgetPath),
		};
	}
};
