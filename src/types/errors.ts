export class PageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PageError';
    }
}

export class ElementNotFoundError extends Error {
    constructor(selector: string) {
        super(`Element not found: ${selector}`);
        this.name = 'ElementNotFoundError';
    }
}

export class ElementNotVisibleError extends Error {
    constructor(selector: string) {
        super(`Element not visible: ${selector}`);
        this.name = 'ElementNotVisibleError';
    }
}

export class NavigationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NavigationError';
    }
}

export class TimeoutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TimeoutError';
    }
} 