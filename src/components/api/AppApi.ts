import { Api, ApiListResponse } from "../base/Api";
import { IItem, IOrder, IOrderResult } from '../../types/index'


export class AppApi extends Api {
    private cdnUrl: string;

    constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdnUrl = cdnUrl;
    }

    fetchProduct(productId: string): Promise<IItem> {
        return this.get(`/product/${productId}`).then((product: IItem) => ({
            ...product,
            image: this.cdnUrl + product.image
        }));
    }

    fetchProductList(): Promise<IItem[]> {
        return this.get('/product').then((data: ApiListResponse<IItem>) =>
            data.items.map((product) => ({
                ...product,
                image: this.cdnUrl + product.image
            }))
        );
    }

    orderProduct(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order)
            .then((data: IOrderResult) => data);
    }
}