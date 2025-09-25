import Collapsible from "./Collapsible.js";

export class FAQ extends Collapsible {
    constructor(options = {}) {
        super({
            containerSelector: "#faq-section",
            triggerSelector: ".faq-item .accordion-header",
            contentSelector: ".faq-item .accordion-content",
            activeClass: "active",
            allowMultiple: false,
            animationDuration: 300,
            onToggle: (trigger, isExpanded) => {
                const faqItem = trigger.closest(".faq-item");
                if (faqItem) {
                    faqItem.classList.toggle("active", isExpanded);
                }
                const icon = trigger.querySelector("i[data-lucide]");
                if (icon) {
                    icon.classList.toggle("rotate-180", isExpanded);
                }
            },
            ...options,
        });
    }
}

export const createFAQ = (options) => new FAQ(options);
