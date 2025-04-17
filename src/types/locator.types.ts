export interface Locator {
    value: string;
    description: string;
    type: string;
}

export interface LocatorType {
    type: string;
    value: string;
    description: string;
}

export interface PageLocators {
    [key: string]: Locator;
} 