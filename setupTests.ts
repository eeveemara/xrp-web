import "@testing-library/jest-dom";

// new node breaks localStorage in tests, use jsdom's
const jsdomWindow = (globalThis as { jsdom?: { window: Window } }).jsdom?.window;
if (jsdomWindow) {
    for (const name of ['localStorage', 'sessionStorage'] as const) {
        if (typeof globalThis[name] === 'undefined') {
            Object.defineProperty(globalThis, name, { value: jsdomWindow[name], configurable: true });
        }
    }
}
