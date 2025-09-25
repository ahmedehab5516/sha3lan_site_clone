/**
 * Base class for collapsible components (accordions, FAQs, etc.)
 */
export class Collapsible {
    constructor(options = {}) {
        this.options = {
            containerSelector: "",
            triggerSelector: "",
            contentSelector: "",
            activeClass: "active",
            allowMultiple: false,
            animationDuration: 300,
            onToggle: null,
            ...options,
        };

        this.container = document.querySelector(this.options.containerSelector);
        if (!this.container) return;

        this.items = this.container.querySelectorAll(
            this.options.triggerSelector
        );
        this.init();
    }

    init() {
        this.items.forEach((trigger) => {
            const content = this.getContent(trigger);
            if (!content) return;

            // Set initial state
            content.style.maxHeight = "0px";
            content.style.overflow = "hidden";
            content.style.transition = `max-height ${this.options.animationDuration}ms ease-out`;

            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                this.toggle(trigger);
            });
        });
    }

    getContent(trigger) {
        return trigger.nextElementSibling;
    }

    toggle(trigger) {
        const content = this.getContent(trigger);
        const isExpanded = trigger.classList.contains(this.options.activeClass);

        if (!this.options.allowMultiple) {
            this.collapseAll(trigger);
        }

        if (isExpanded) {
            this.collapse(trigger, content);
        } else {
            this.expand(trigger, content);
        }

        if (this.options.onToggle) {
            this.options.onToggle(trigger, !isExpanded);
        }
    }

    expand(trigger, content) {
        trigger.classList.add(this.options.activeClass);
        content.style.maxHeight = `${content.scrollHeight}px`;
    }

    collapse(trigger, content) {
        trigger.classList.remove(this.options.activeClass);
        content.style.maxHeight = "0px";
    }

    collapseAll(exceptTrigger = null) {
        this.items.forEach((trigger) => {
            if (trigger !== exceptTrigger) {
                const content = this.getContent(trigger);
                if (content) {
                    this.collapse(trigger, content);
                }
            }
        });
    }
}

export default Collapsible;
