import { byId, hide, show } from '../document';

interface ShowOptions {
	readonly header: string;
	readonly copy: string;
	readonly positive: string;
	readonly negative: string;
}

export const open = ({ header, copy, positive, negative }: ShowOptions) =>
	new Promise<boolean>(resolve => {
		const root = byId('confirm-dialog') as GraphicsElement;
		byId('header/text', root).text = header;
		byId('copy/text', root).text = copy;
		const positiveButton = byId('positive-button', root);
		const negativeButton = byId('negative-button', root);
		positiveButton.text = positive;
		negativeButton.text = negative;
		const getCloseCallback = (result: boolean) => () => {
			hide(root);
			resolve(result);
		};
		positiveButton.onclick = getCloseCallback(true);
		negativeButton.onclick = getCloseCallback(false);
		show(root);
	});
