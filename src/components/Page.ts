import { IPage } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Components";
import { IEvents } from "./base/Events";


export class Page extends Component<IPage> {
	protected _basketCounter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _pageWrapper: HTMLElement;
	protected _headerBasket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._basketCounter = ensureElement<HTMLElement>(
			'.header__basket-counter',
			container
		);
		this._gallery = ensureElement<HTMLElement>('.gallery', container);
		this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper', container);
		this._headerBasket = ensureElement<HTMLElement>('.header__basket', container);
		this._headerBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.setText(this._basketCounter, value);
	}

	set catalog(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

	set locked(isLocked: boolean) {
		this.toggleClass(this._pageWrapper, 'page__wrapper_locked', isLocked);
	}
}
