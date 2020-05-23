import { byId } from '../document';

const A = 'A';
const B = 'B';
const C = 'C';
const D = 'D';
const E = 'E';
const F = 'F';
const G = 'G';
const ALL_SEGMENTS = [A, B, C, D, E, F, G];

export type CharMap = {
	[char: string]: {
		A?: typeof A;
		B?: typeof B;
		C?: typeof C;
		D?: typeof D;
		E?: typeof E;
		F?: typeof F;
		G?: typeof G;
	};
};

export const DIGITS: CharMap = {
	'0': { A, B, C, D, E, F },
	'1': { B, C },
	'2': { A, B, G, E, D },
	'3': { A, B, G, C, D },
	'4': { F, B, G, C },
	'5': { A, F, G, C, D },
	'6': { A, F, G, E, C, D },
	'7': { A, B, C },
	'8': { A, B, C, D, E, F, G },
	'9': { A, B, C, D, F, G },
};

export type ClassNames = {
	on: string;
	off: string;
};

export const print = (
	element: Element,
	char: string,
	{ charMap, classNames }: { charMap: CharMap; classNames: ClassNames },
) => {
	const segmentsActivated = charMap[char] || {};
	for (const segmentId of ALL_SEGMENTS) {
		(element.getElementById(segmentId) as GraphicsElement).class =
			segmentId in segmentsActivated ? classNames.on : classNames.off;
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
