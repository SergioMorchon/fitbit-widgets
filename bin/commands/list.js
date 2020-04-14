const { getWidgets } = require('../get-widgets');

exports.list = () => {
	for (const { name } of getWidgets()) {
		process.stdout.write(`${name}\n`);
	}
};
