// The contents of this module could be included in a widget's index.js.
// However, this would make it harder to extract the contents if an independent solution is sought in future
// (ie, not requiring duplication of this content for each widget type).

type Config = {
	[key: string]: string | undefined;
};

export const getConfig = (el: Element): Config => {
	// el: template symbol element that may contain a <text id="config"> child. config may contain one or more propertyName:value declarations, like the HTML style attribute.
	// Returns an object containing propertyName:value pairs.
	const configEl = el.getElementById('config');
	if (!configEl) return {};

	const config: Config = {};
	const properties = configEl.text.split(';');
	properties.forEach((property) => {
		const colonIndex = property.indexOf(':');
		const propertyName = property.substring(0, colonIndex).trim();
		if (propertyName) {
			const propertyValue = property.substring(colonIndex + 1).trim();
			config[propertyName] = propertyValue;
		}
	});
	return config;
};
