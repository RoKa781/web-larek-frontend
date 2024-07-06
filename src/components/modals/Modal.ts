import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Components';
import { IEvents } from '../base/Events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected closeButton: HTMLButtonElement;
	protected contentContainer: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.contentContainer = ensureElement<HTMLElement>(
			'.modal__content',
			container
		);
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.contentContainer.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	set content(value: HTMLElement) {
		this.contentContainer.replaceChildren(value);
	}

	_toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}

	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	open() {
		this._toggleModal();
		document.addEventListener('keydown', this._handleEscape);
		this.events.emit('modal:open');
	}

	close() {
		this._toggleModal(false);
		document.removeEventListener('keydown', this._handleEscape);
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
