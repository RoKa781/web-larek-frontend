import { IOrderContacts } from "../types";
import { IEvents } from "./base/Events";
import { Form } from "./forms/Form";

export class ContactsForm extends Form<IOrderContacts> {
    protected _phoneInput: HTMLInputElement;
    protected _emailInput: HTMLInputElement;
  
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
      this._phoneInput = this.container.elements.namedItem('phone') as HTMLInputElement;
      this._emailInput = this.container.elements.namedItem('email') as HTMLInputElement;
    }
  
    set phone(value: string) {
      this._phoneInput.value = value;
    }
  
    set email(value: string) {
      this._emailInput.value = value;
    }
  }