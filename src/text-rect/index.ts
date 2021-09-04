import { byId } from '../document';
import { getConfig } from './widget-utils';

type TextRectWidget = {
	text: string;
	redraw(): void;
};

export default (el: GraphicsElement): TextRectWidget => {
	const textEl = byId('text', el) as TextElement;
	const rectEl = byId('rect', el) as RectElement;
	// Because the following attributes are set only when the widget is constructed, they won't respond to subsequent changes.
	let paddingLeft = 5,
		paddingRight = 5,
		paddingTop = 0,
		paddingBottom = 0;

	const config = getConfig(el);
	for (const name in config) {
		const value = Number(config[name]); // convert to Number here because the only allowed values are numbers
		switch (name) {
			case 'padding-left':
				paddingLeft = value;
				break;
			case 'padding-right':
				paddingRight = value;
				break;
			case 'padding-top':
				paddingTop = value;
				break;
			case 'padding-bottom':
				paddingBottom = value;
				break;
		}
	}

	const redraw = () => {
		// This function must be called when .style.display is changed from 'none'. This can be done directly or via some other API function.
		if (el.style.display === 'none') return;

		const bbox = textEl.getBBox(); // warning: this won't work if the element is rotated due to bug in Fitbit OS
		const anchorOffset =
			textEl.textAnchor === 'start'
				? 0
				: textEl.textAnchor === 'end'
				? bbox.width
				: bbox.width / 2;
		rectEl.x = -paddingLeft - anchorOffset;
		rectEl.width = bbox.width + paddingLeft + paddingRight;
		rectEl.y = bbox.top - el.y - paddingTop;
		rectEl.height = bbox.height + paddingTop + paddingBottom;
	};

	redraw();

	return {
		redraw,
		get text() {
			return textEl.text;
		},
		set text(text) {
			textEl.text = text;
			redraw();
		},
	};
};
