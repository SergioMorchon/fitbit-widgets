const { join } = require('path');
const { walkWidgets } = require('./walk-widgets');
const { walkFiles } = require('./walk-files');

const requiredFiles = ['index.ts', 'index.gui', join('doc', 'README.md')];

for (const widget of walkWidgets()) {
	const files = new Set(walkFiles(widget.path));
	for (const file of requiredFiles) {
		const filePath = join(widget.path, file);
		console.assert(files.has(filePath), `${widget.name} must define ${file}`);
	}
}
