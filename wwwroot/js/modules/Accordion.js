import Collapsible from "./Collapsible.js";

export class Accordion extends Collapsible {
    constructor(options = {}) {
        super({
            containerSelector: "[data-accordion]",
            triggerSelector: "[data-accordion-trigger]",
            contentSelector: "[data-accordion-content]",
            activeClass: "active",
            allowMultiple: false,
            animationDuration: 300,
            onToggle: (trigger, isExpanded) => {
                const icon = trigger.querySelector("i[data-lucide]");
                if (icon) {
                    icon.classList.toggle("rotate-180", isExpanded);
                }
            },
            ...options,
        });
    }
}

export const createAccordion = (options) => new Accordion(options);
