import { ensureElement } from "../utils/utils";
import { ICardAction } from "./Card";
import { Component } from "./base/Components";

export interface IBasketItem {
	title: string;
	price: number;
}

export class BasketItem extends Component<IBasketItem> {
	protected _indexElement: HTMLElement;
	protected _titleElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;

	constructor(container: HTMLElement, index: number, action?: ICardAction) {
		super(container);

		this._indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
		this.setText(this._indexElement, index + 1);
		this._titleElement = ensureElement<HTMLElement>('.card__title', container);
		this._priceElement = ensureElement<HTMLElement>('.card__price', container);
		this._buttonElement = container.querySelector('.card__button');

		if (action?.onClick) {
			if (this._buttonElement) {
				this._buttonElement.addEventListener('click', action.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._indexElement, value);
	}

	set title(value: string) {
		this.setText(this._titleElement, value);
	}

	set price(value: number) {
		this.setText(this._priceElement, value);
	}
}