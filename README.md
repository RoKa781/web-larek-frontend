# Проектная работа "Веб-ларек"
https://github.com/RoKa781/web-larek-frontend
Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm i
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура приложения
### Об архитектуре
Взаимодействие внутри приложения осуществляется через события. Модели инициируют события, которые затем обрабатываются слушателями событий в основном коде. Эти слушатели выполняют передачу данных компонентам интерфейса, а также производят необходимые вычисления. Кроме того, слушатели могут изменять значения в моделях для актуализации данных.

### Основные части архитектуры
Данные (Models) — управляют состоянием приложения.
Отображения (Components) — отвечают за визуальное представление данных.
События (EventEmitter) — обеспечивают связь между данными и отображениями.
API — класс для взаимодействия с сервером.
### Взаимодействие частей
Процессы в приложении реализованы через систему событий (EventEmitter). Компоненты подписываются на события и реагируют на них, обновляя свое состояние и отображение. Это позволяет создать слабосвязанную архитектуру, где компоненты могут взаимодействовать друг с другом, не зная о внутренней реализации друг друга.
### Базовый класс Api
**Класс Api отвечает за запросы к серверу. Его функции включают получение и отправку данных на сервер.**

_Конструктор:_
```
constructor(private baseUrl: string, private options: RequestInit) {}
```
_Методы:_
```
    handleResponse(response: Response): Promise<object> - Обрабатывает ответ от сервера
    get<T>(endpoint: string): Promise<T> - Выполняет GET-запрос
    post<T>(endpoint: string, ApiPostMethods = 'POST'): Promise<T> - Выполняет POST-запрос
```
### Базовый класс Component\<T>
**Абстрактный класс компонента предназначен для создания компонентов пользовательского интерфейса. Служит в качестве базового компонента для работы с DOM.**

_Конструктор:_
```
constructor(HTMLElement) (
) {}
```
_Методы:_
```
toggleClass(className: string): void - Переключает указанный класс у элемента.
setText(text: string): void - Устанавливает текстовое содержимое элемента.
setImage(src: string): void - Устанавливает изображение для элемента.
setDisabled(isDisabled: boolean): void - Устанавливает или снимает блокировку элемента.
setHidden(isHidden: boolean): void - Скрывает элемент.
setVisible(isVisible: boolean): void - Отображает элемент.
render(): void - Генерирует и вставляет компонент в контейнер.
```
### Базовый класс EventEmitter
**Брокер событий. Обеспечивает обработку событий. Его функции включают установку и удаление слушателей событий, а также вызов слушателей при наступлении события.**

_Конструктор:_
```
constructor() {
  this._events = new Map();
}
```
_Методы:_
```
on - Устанавливает обработчик на событие.
off - Снимает обработчик с события.
emit - Инициирует событие с данными.
onAll - Слушает все события.
offAll - Сбрасывает все обработчики.
trigger - Создает триггер, генерирующий событие при вызове.

Интерфейс IEvents
on<T extends object>(EventName, callback) Метод для подписки на событие. Принимает название события и коллбек, который будет вызван при наступлении события.

emit<T extends object>(string, T): void Метод для инициирования события. Принимает название события и опциональные данные, которые будут переданы обработчикам.

trigger<T extends object>(string, Partial<T>?) Метод, который возвращает функцию-триггер для определенного события. Этот триггер может быть вызван для инициирования события с заданными данными.

```
### Базовый класс Model\<T>
**Абстрактный класс, который служит основой для создания моделей. Этот класс предоставляет основные функциональные возможности для всех моделей, наследующих от него.**

_Конструктор:_
```
constructor(Partial<T>, IEvents) {

}
```
_Методы:_
```
emitChanges(string, object): void - Оповещает о том, что модель изменилась.
```
## Классы компонентов

### Класс Page
**Наследует класс Component и представляет страницу веб-приложения.**

_Конструктор:_
```
constructor(HTMLElement, IEvents)
```
_Методы:_
```
counter(value: number): void - Установка значения счетчика товаров в корзине.
catalog(items: HTMLElement[]): void - Установка элемента галереи товаров.
locked(isLocked: boolean): void - Установка состояния блокировки страницы.
```
### Класс Card
**Наследует класс Component и представляет карточку товара**

_Конструктор:_
```
constructor(
  blockName: string, 
  container: HTMLElement, 
  actions?: IEvents)
```
_Методы:_
```
disablePrice - Выключает кнопку, если цена равна нулю.
id - Устанавливает и возвращает идентификатор карточки.
buttonText - Устанавливает текст кнопки.
title - Устанавливает и возвращает заголовок карточки.
price - Устанавливает и возвращает цену карточки.
image - Устанавливает и возвращает изображение карточки.
category - Устанавливает и возвращает категорию карточки.
index - Устанавливает и возвращает индекс карточки.
```
### Класс BasketItem
**Наследует класс Component и представляет элемент корзины товаров**

_Конструктор:_
```
constructor(
  container: HTMLElement,
  index: number,
  action?: ICardAction
)
```
_Методы:_
```
index - Устанавливает порядковый номер и возвращает его.
title - Устанавливает и возвращает заголовок элемента.
price - Устанавливает и возвращает цену элемента.
```
### Класс Modal
**Наследует класс Component и обеспечивает работу модального окна.Его функции: открытие и закрытие модального окна**

_Конструктор:_
```
constructor(container: HTMLElement, events: IEvents)
```
_Методы:_
```
set content(value: string): void - Заменяет содержимое модального окна новым значением.
open(): void - Открывает модальное окно.
close(): void - Закрывает модальное окно.
render(): HTMLElement - Возвращает контейнер модального окна.

```
### Класс Form\<T>
**Наследует класс Component и отвечает за формы на странице.Устанавливает обработчики события на ввод данных и отправку формы.**

_Конструктор:_
```
constructor(container: HTMLFormElement, events: IEvents)
```
_Методы:_
```
onInputChange - Обрабатывает изменения ввода в форме.
valid - Устанавливает состояние валидности формы.
errors - Устанавливает и отображает ошибки валидации формы.
render - Обновляет отображение формы.
```
### Класс Basket
**Наследует класс Component и отвечает за корзину. В нем инициализируется список товаров, итоговая сумма и кнопка. Также содержит функцию, которая добавляет обработчик событий на кнопку и возвращает массив товаров.**

_Конструктор:_
```
constructor(container: HTMLElement, events: IEvents)
```
_Методы:_
```
items(value: HTMLElement[]): void - Устанавливает содержимое корзины;
total(total: number): void -  Отображает общую стоимость товаров в корзине.
disableButton(value: string): void - Состояние кнопки оформления заказа.
```
### Класс Success
**Наследует класс Component и отображает окно успешной оплаты**

_Конструктор:_
```
constructor(container: HTMLFormElement, events: ISuccessActions)
```
_Методы:_
```
total()
close(): void - Кнопка закрытия окна.

```

### Класс OrderForm
**Наследует функционал от класса Form и управляет формой заказа**

_Конструктор:_
```
constructor(container: HTMLElement, events: IEvents)
```
_Методы:_
```
set address(value: string): void - Устанавливает адрес доставки.
setToggleClassPayment(value: string): void - Устанавливает способ оплаты.

```
### Класс AppState
**Является наследником Model. Управляет содержимым всего приложения. Он хранит состояние приложения, каталог продуктов, корзину, заказ, данные для предварительного просмотра, ошибки формы.**

_Методы:_
```
updateBasket - Обновляет содержимое корзины.
clearBasket - Очищает корзину.
clearOrder - Очищает текущий заказ.
setCatalog - Устанавливает каталог товаров.
setPreview - Устанавливает превью товара.
getOrderProducts - Получает список товаров в заказе.
productOrder - Оформляет заказ на товар.
addToBasket - Добавляет товар в корзину.
removeFromBasket - Удаляет товар из корзины.
getTotal - Получает общую сумму заказа.
setPaymentMethod - Устанавливает метод оплаты.
setOrderDeliveryField - Устанавливает поле для доставки в заказе.
setOrderContactField - Устанавливает контактные данные в заказе.
validateDelivery - Проверяет правильность данных для доставки.

```

## Основные интерфейсы проекта
```
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

export type FormError = Partial<Record<keyof IOrder, string>>;
export type PaymenthMethods = 'card' | 'cash';
export type CategoryType = 'софт-скилл' | 'хард-скилл' | 'кнопка' | 'другое' | 'доп';
```