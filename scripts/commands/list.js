const { getWidgets } = require('../utils/get-widgets');

exports.list = () => {
	for (const { name } of getWidgets()) {
		process.stdout.write(`${name}\n`);
	}
};
