export interface IItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
    status: boolean;
}

export interface IItemList {
    total: number;
    items: IItem[];
}

export interface IBasket {
    item: IItem[];
    price: string;
}

export interface IOrderForm {
    address: string;
    email: string;
    phone: string;
    payment: string;
}

export interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

export interface IOrderResult extends IOrder {
    id: string;
    error?: string
}

export interface IAppState {
    catalog: IItem[];
    basket: IBasket;
    preview: string | null;
    order: IOrderForm | null;
}

export interface IOrderContacts {
    email: string;
    phone: string;
}

export interface ICard {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
    button: string;
}

export interface IOrderDeliveryForm {
    payment: PaymenthMethods;
    address: string;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}


export type FormError = Partial<Record<keyof IOrder, string>>;
export type PaymenthMethods = 'card' | 'cash';
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'кнопка' | 'другое' | 'доп';