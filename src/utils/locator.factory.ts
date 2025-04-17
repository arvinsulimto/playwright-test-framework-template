import { PageLocators, LocatorType } from '../types/locator.types';

export class LocatorFactory {
    /**
     * Creates a page locator with type safety
     */
    public static createPageLocators<T extends PageLocators>(locators: T): T {
        return locators;
    }

    /**
     * Combines multiple locator sets into one
     */
    public static combineLocators<T extends PageLocators>(...locatorSets: T[]): T {
        return locatorSets.reduce((combined, current) => ({
            ...combined,
            ...current
        }), {} as T);
    }

    /**
     * Creates a dynamic locator by replacing placeholders
     */
    public static createDynamicLocator(baseLocator: string, replacements: Record<string, string>): string {
        let result = baseLocator;
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replace(`{${key}}`, value);
        }
        return result;
    }

    /**
     * Creates a data-testid locator
     */
    public static dataTestId(id: string): string {
        return `[data-testid="${id}"]`;
    }

    /**
     * Creates a role-based locator
     */
    public static role(role: string): string {
        return `[role="${role}"]`;
    }

    /**
     * Creates a text-based locator
     */
    public static text(text: string): string {
        return `text=${text}`;
    }
} 