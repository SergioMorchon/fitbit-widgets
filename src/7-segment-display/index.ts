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
	[char: string]: number;
};

export const print = (
	element: Element,
	char: string,
	{
		charMap,
		setVisibility,
	}: {
		charMap: CharMap;
		setVisibility: (element: GraphicsElement, on: boolean) => void;
	},
) => {
	const segmentsActivated = charMap[char] || 0;
	for (let i = 0; i < SEGMENTS_COUNT; i++) {
		setVisibility(
			byId(`${i}`, element) as GraphicsElement,
			!!((1 << i) & segmentsActivated),
		);
	}
};

// Based on the GUI segments
const HEIGHT = 218;
const WIDTH = 122;

export const resize = (
	element: Element,
	{ height, width }: { height: number; width: number },
) => {
	const { groupTransform } = byId(
		'7-segment-display-group',
		element,
	) as GroupElement;
	if (groupTransform) {
		groupTransform.scale.x = width / WIDTH;
		groupTransform.scale.y = height / HEIGHT;
	}
};
