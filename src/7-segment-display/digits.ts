import { A, B, C, D, E, F, G, CharMap } from './index';

export default {
	'0': A | B | C | D | E | F,
	'1': B | C,
	'2': A | B | D | E | G,
	'3': A | B | C | D | G,
	'4': B | C | F | G,
	'5': A | C | D | F | G,
	'6': A | C | D | E | F | G,
	'7': A | B | C,
	'8': A | B | C | D | E | F | G,
	'9': A | B | C | D | F | G,
} as CharMap;
