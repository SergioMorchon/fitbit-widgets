import { byId } from '../document';

export const A = 1 << 0;
export const B = 1 << 1;
export const C = 1 << 2;
export const D = 1 << 3;
export const E = 1 << 4;
export const F = 1 << 5;
export const G = 1 << 6;

const SEGMENTS_COUNT = 7;

export type CharMap = {
	readonly [char: string]: number;
};

type PrintOptions = {
	readonly value: string;
	readonly charMap: CharMap;
	readonly updateSegment: (element: GraphicsElement, on: boolean) => void;
};

export const print = (
	element: Element,
	{ value, charMap, updateSegment }: PrintOptions,
): void => {
	const segmentsActivated = charMap[value] || 0;
	for (let i = 0; i < SEGMENTS_COUNT; i++) {
		updateSegment(
			byId(`${i}`, element) as GraphicsElement,
			!!((1 << i) & segmentsActivated),
		);
	}
};

// Based on the GUI segments
const HEIGHT = 218;
const WIDTH = 122;

type ResizeOptions = {
	readonly width: number;
	readonly height: number;
};

export const resize = (element: Element, size: ResizeOptions): void => {
	const { groupTransform } = byId(
		'7-segment-display-group',
		element,
	) as GroupElement;
	if (groupTransform) {
		groupTransform.scale.x = size.width / WIDTH;
		groupTransform.scale.y = size.height / HEIGHT;
	}
};

type VisibilityOptions = {
	readonly visible: boolean;
};

export const setVisibility = (
	element: Element,
	visibility: VisibilityOptions,
): void => {
	for (let i = 0; i < SEGMENTS_COUNT; i++) {
		(byId(
			`${i}`,
			element,
		) as GraphicsElement).style.visibility = visibility.visible
			? 'visible'
			: 'hidden';
	}
};

export type SegmentDisplay = {
	charMap: CharMap;
	value: string;
	height: number;
	width: number;
	visible: boolean;
};

export default (
	element: Element,
	options: PrintOptions & ResizeOptions & VisibilityOptions,
): SegmentDisplay => {
	const { updateSegment } = options;
	let { charMap, height, width, visible, value } = options;

	resize(element, { height, width });
	print(element, { value, charMap, updateSegment });
	setVisibility(element, { visible });

	const instance = {
		get charMap(): typeof charMap {
			return charMap;
		},
		set charMap(newValue: typeof charMap) {
			charMap = newValue;
			print(element, { value, charMap, updateSegment });
		},

		get value(): typeof value {
			return value;
		},
		set value(newValue: typeof value) {
			value = newValue;
			print(element, { value, charMap, updateSegment });
		},

		get height(): typeof height {
			return height;
		},
		set height(newValue: typeof height) {
			height = newValue;
			resize(element, { height, width });
		},

		get width(): typeof width {
			return width;
		},
		set width(newValue: typeof width) {
			width = newValue;
			resize(element, { height, width });
		},

		get visible(): typeof visible {
			return visible;
		},
		set visible(newValue: typeof visible) {
			visible = newValue;
			setVisibility(element, { visible });
		},
	};
	return instance;
};
