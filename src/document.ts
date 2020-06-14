import document from 'document';

export const byId = (id: string, root: ElementSearch = document): Element => {
	const element = root.getElementById(id);
	if (!element) {
		throw Error(`Element #${id} not found`);
	}

	return element;
};

export const show = (element: GraphicsElement): void => {
	element.style.display = 'inline';
};

export const hide = (element: GraphicsElement): void => {
	element.style.display = 'none';
};
