export abstract class Component<T> {
    
    protected constructor(protected readonly container: HTMLElement | null) {}

    toggleClass(element: HTMLElement | null, className: string, force?: boolean) {
        if (element) {
            element.classList.toggle(className, force);
        }
    }

    protected setText(element: HTMLElement | null, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    setDisabled(element: HTMLElement | null, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    protected setHidden(element: HTMLElement | null) {
        if (element) {
            element.style.display = 'none';
        }
    }

    protected setVisible(element: HTMLElement | null) {
        if (element) {
            element.style.removeProperty('display');
        }
    }

    protected setImage(element: HTMLImageElement | null, src: string | undefined, alt?: string | undefined) {
        if (element && src !== undefined) {
            element.src = src;
            if (alt !== undefined) {
                element.alt = alt;
            }
        }
    }

    render(data?: Partial<T>): HTMLElement | null {
        if (data) {
            Object.assign(this as object, data);
        }
        return this.container;
    }
}