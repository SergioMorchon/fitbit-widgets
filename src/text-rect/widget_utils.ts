// The contents of this module could be included in a widget's index.js.
// However, this would make it harder to extract the contents if an independent solution is sought in future
// (ie, not requiring duplication of this content for each widget type).

import document from 'document';

export const constructWidgets = (widgetType, construct, parent = document) => {
	// widgetType: string name: value of SVG element 'type' attribute' declared in widget <symbol>.
	// construct: function to be called to convert a GraphicsElement to a widget of the relevant type.
	// parent: ElementSearch to be searched for widgetType.
	const widgets = parent.getElementsByTypeName(widgetType);
	widgets.forEach((widget) => {
		if (widget.id !== widget.type)
			// needed because old firmware will find the <use> AND the <symbol> for each widget instance
			construct(widget);
	});
};

export const getConfig = (el) => {
	// el: template symbol element that may contain a <text id="config"> child. config may contain one or more propertyName:value declarations, like the HTML style attribute.
	// Returns an object containing propertyName:value pairs.
	const configEl = el.getElementById('config');
	if (!configEl) return {};

	const config = {};
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
