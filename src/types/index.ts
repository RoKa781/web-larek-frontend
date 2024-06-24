interface IItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
    status: boolean;
}

interface IItemList {
    total: number;
    items: IItem[];
}

interface IBasket {
    item: IItem[];
    price: string;
}

interface IOrderForm {
    address: string;
    email: string;
    phone: string;
    payment: string;
}

interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

interface IOrderResult extends IOrder {
    id: string;
    error?: string
}

interface IAppState {
    catalog: IItem[];
    basket: IBasket;
    preview: string | null;
    order: IOrderForm | null;
}