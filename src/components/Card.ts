import { ICard } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Components';

export interface ICardAction {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
	protected _titleElement: HTMLElement;
	protected _imageElement?: HTMLImageElement;
	protected _categoryElement?: HTMLElement;
	protected _descriptionElement?: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _buttonElement?: HTMLButtonElement;
	protected _modalButtonElement?: HTMLButtonElement;

	private categoryKeyMap: Record<string, string> = {
		'софт-скил': '_soft',
		'хард-скил': '_hard',
		кнопка: '_button',
		дополнительное: '_additional',
		другое: '_other',
	};

	constructor(
		protected blockName: string,
		container: HTMLElement,
		action?: ICardAction
	) {
		super(container);
		this._titleElement = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._imageElement = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._priceElement = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._categoryElement = container.querySelector(`.${blockName}__category`);
		this._descriptionElement = container.querySelector(`.${blockName}__text`);
		this._buttonElement = container.querySelector(`.${blockName}__button`);
		if (action?.onClick) {
			if (this._buttonElement) {
				this._buttonElement.addEventListener('click', action.onClick);
			} else {
				container.addEventListener('click', action.onClick);
			}
		}
	}

	disablePrice (value: number | null) {
		if (!value && this._buttonElement) {
			this._buttonElement.disabled = true;
		}
	}

	set id (value: string) {
		this.container.dataset.id = value;
	}

	get id (): string {
		return this.container.dataset.id || '';
	}

	set title (value: string) {
		this.setText(this._titleElement, value);
	}

	get title (): string {
		return this._titleElement.textContent || '';
	}

	set buttonTitle (value: string) {
		if (this._buttonElement) {
			this.setText(this._buttonElement, value);
		}
	}

	set image (value: string) {
		if (this._imageElement instanceof HTMLImageElement) {
			this._imageElement.src = value;
			this._imageElement.alt = this._titleElement.textContent;
		}
	}

	set price (value: number | null) {
		this.setText(
			this._priceElement,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		this.disablePrice(value);
	}

	get price (): number {
		return Number(this._priceElement.textContent || '');
	}

	set category (value: string) {
		this.setText(this._categoryElement, value);
		const categoryClass = this._categoryElement.classList[0];
		this._categoryElement.className = '';
		this._categoryElement.classList.add(`${categoryClass}`);
		this._categoryElement.classList.add(`${categoryClass}${this.categoryKeyMap[value]}`);
	}

	set description (value: string | string[]) {
		if (Array.isArray(value)) {
			this._descriptionElement.replaceWith(
				...value.map((str) => {
					const descriptionTemplate = this._descriptionElement.cloneNode() as HTMLElement;
					this.setText(descriptionTemplate, str);
					return descriptionTemplate;
				})
			);
		} else {
			this.setText(this._descriptionElement, value);
		}
	}
}

