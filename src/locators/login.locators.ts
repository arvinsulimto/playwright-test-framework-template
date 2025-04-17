import { Locator } from '../types/locator.types';

export const loginLocators: Record<string, Locator> = {
    usernameInput: {
        value: '[data-test="username"]',
        description: 'Username input field',
        type: 'input'
    },
    passwordInput: {
        value: '[data-test="password"]',
        description: 'Password input field',
        type: 'input'
    },
    loginButton: {
        value: '[data-test="login-button"]',
        description: 'Login button',
        type: 'button'
    },
    errorMessage: {
        value: '[data-test="error"]',
        description: 'Error message container',
        type: 'text'
    }
}; 