import { $$, throttle } from "../utils/dom.js";

export class ScrollAnimations {
    constructor(options = {}) {
        this.options = {
            animateSelector: "[data-animate]",
            activeClass: "animate-in",
            threshold: 0.2,
            once: true,
            ...options,
        };

        this.elements = $$(this.options.animateSelector);
        this.animatedElements = new Set();

        if (this.elements.length) {
            this.init();
        }
    }

    init() {
        // Setup Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        if (this.options.once) {
                            this.observer.unobserve(entry.target);
                        }
                    } else if (!this.options.once) {
                        entry.target.classList.remove(this.options.activeClass);
                    }
                });
            },
            {
                threshold: this.options.threshold,
                rootMargin: "0px",
            }
        );

        // Start observing elements
        this.elements.forEach((element) => {
            // Set initial state
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition =
                "opacity 0.6s ease-out, transform 0.6s ease-out";

            this.observer.observe(element);
        });
    }

    animate(element) {
        if (this.animatedElements.has(element) && this.options.once) return;

        element.classList.add(this.options.activeClass);
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";

        this.animatedElements.add(element);
    }

    // Public method to refresh observers (useful after dynamic content changes)
    refresh() {
        if (this.options.once) {
            const newElements = $$(this.options.animateSelector).filter(
                (el) => !this.animatedElements.has(el)
            );

            newElements.forEach((element) => {
                element.style.opacity = "0";
                element.style.transform = "translateY(20px)";
                this.observer.observe(element);
            });
        }
    }
}

export const createScrollAnimations = (options) =>
    new ScrollAnimations(options);
