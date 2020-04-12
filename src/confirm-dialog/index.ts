import { byId, hide, show } from '../document';

interface Options {
	/**
	 * Text for the title
	 */
	readonly header: string;
	/**
	 * Hint text for the user
	 */
	readonly copy: string;
	/**
	 * Text for the positive action
	 */
	readonly positive: string;
	/**
	 * Text for the negative action
	 */
	readonly negative: string;
}

/**
 * Opens a dialog and returns a promise that will be filled with the option the user chooses
 */
export const open = ({ header, copy, positive, negative }: Options) =>
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
