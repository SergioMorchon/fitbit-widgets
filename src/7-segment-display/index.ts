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

const render = (
	segmentElement: Element,
	charMap: CharMap,
	classNames: ClassNames,
	char: string,
) => {
	const segmentsActivated = charMap[char];
	for (const segmentId of ALL_SEGMENTS) {
		(segmentElement.getElementById(segmentId) as GraphicsElement).class =
			segmentId in segmentsActivated ? classNames.on : classNames.off;
	}
};

// Based on the GUI segments
const UI_HEIGHT = 205;
const UI_WIDTH = 110;

export default (
	root: GraphicsElement,
	{ charMap, classNames }: { charMap: CharMap; classNames: ClassNames },
) => {
	const { groupTransform } = root.getElementById(
		'7-segment-display-group',
	) as GroupElement;
	let height = UI_HEIGHT;
	let width = UI_WIDTH;
	const updateSize = () => {
		if (groupTransform) {
			groupTransform.scale.x = height / UI_HEIGHT;
			groupTransform.scale.y = width / UI_WIDTH;
		}
	};
	return {
		print(char: string) {
			render(root, charMap, classNames, char);
		},
		set height(value: number) {
			height = value;
			updateSize();
		},
		get height() {
			return height;
		},
		set width(value: number) {
			width = value;
			updateSize();
		},
		get width() {
			return width;
		},
	};
};
