/**
 * DOM utility functions for common operations
 */

/**
 * Select a single element
 * @param {string} selector - CSS selector
 * @param {Element} [context=document] - Context to search within
 * @returns {Element|null}
 */
export const $ = (selector, context = document) =>
    context.querySelector(selector);

/**
 * Select multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} [context=document] - Context to search within
 * @returns {Element[]}
 */
export const $$ = (selector, context = document) => [
    ...context.querySelectorAll(selector),
];

/**
 * Toggle class on element
 * @param {Element} element - Target element
 * @param {string} className - Class to toggle
 * @param {boolean} [force] - Force add or remove
 */
export const toggleClass = (element, className, force) => {
    if (typeof force === "boolean") {
        element.classList.toggle(className, force);
    } else {
        element.classList.toggle(className);
    }
};

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {boolean|object} [options] - Event options
 * @returns {Function} Cleanup function
 */
export const listen = (element, event, handler, options) => {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
};

/**
 * Get element's distance from top of document
 * @param {Element} element - Target element
 * @returns {number}
 */
export const getOffsetTop = (element) => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
};

/**
 * Check if element is in viewport
 * @param {Element} element - Target element
 * @param {number} [offset=0] - Offset from viewport edge
 * @returns {boolean}
 */
export const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight + offset &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function}
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds limit
 * @returns {Function}
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
