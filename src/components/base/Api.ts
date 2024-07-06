export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected _checkResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json().then(data => Promise.reject(data.error ?? response.statusText));
    }

    protected _request(uri: string, method: string, data?: object) {
        const url = this.baseUrl + uri;
        const fetchOptions: RequestInit = {
            ...this.options,
            method,
            body: data ? JSON.stringify(data) : undefined
        };
        return fetch(url, fetchOptions).then(this._checkResponse);
    }

    get(uri: string) {
        return this._request(uri, 'GET');
    }

    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return this._request(uri, method, data);
    }
}
