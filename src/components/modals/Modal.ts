import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/Events";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement; 
    protected contentContainer: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
      super(container);
      this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
      this.contentContainer = ensureElement<HTMLElement>('.modal__content', container);
      this.closeButton.addEventListener('click', this.close.bind(this));
      this.container.addEventListener('click', this.close.bind(this));
      this.contentContainer.addEventListener('click', (event) => event.stopPropagation());
    }
  
    set content (value: HTMLElement) {
      this.contentContainer.replaceChildren(value);
    }
  
    open () {
      this.container.classList.add('modal_active');
      this.events.emit('modal:open'); 
    }

    close () {
      this.container.classList.remove('modal_active');
      this.events.emit('modal:close'); 
    }

    render (data: IModalData): HTMLElement {
      super.render(data);
      this.open();
      return this.container;
    }
}