import { ensureElement, createElement } from '../utils/utils';
import { Component } from './base/Components';
import { IEvents } from './base/Events';

export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price', this.container);
		this._button = ensureElement<HTMLElement>(
			'.basket__button',
			this.container
		);
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}
		this.items = [];
	}
	
	disableButton(value: string) {
		this.setDisabled(this._button, value === 'true');
	}

	set items (items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this._button, false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent:
						'Вы ничего не выбрали',
				})
			);
			this.disableButton('true');
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total.toString()} синапсов`);
	}
}
