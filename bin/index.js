#!/usr/bin/env node
const [, , commandName, ...commandArgs] = process.argv;

/** @type {Object<string, () => void>} */
const commands = {
	list: () => require('./commands/list').list(),
	install: () => require('./commands/install').install(commandArgs[0]),
};

if (!commandName || commandName === 'help') {
	process.stdout.write(
		['Avaiable commands:', ...Object.keys(commands)].join('\n'),
	);
	process.exit();
}

try {
	const command = commands[commandName];
	if (!command) {
		throw new Error(`Unknown command: ${command}`);
	}

	command();
} catch (e) {
	process.stderr.write(e.message);
}
