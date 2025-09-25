import { $, $$, listen, throttle } from "../utils/dom.js";

export class Navigation {
    constructor(options = {}) {
        this.options = {
            navSelector: "#main-nav",
            mobileMenuSelector: "#mobile-menu",
            mobileMenuTriggerSelector: "#mobile-menu-trigger",
            activeClass: "active",
            mobileBreakpoint: 768,
            headerHeight: 80, // Adjust based on your header height
            ...options,
        };

        this.nav = $(this.options.navSelector);
        this.mobileMenu = $(this.options.mobileMenuSelector);
        this.mobileMenuTrigger = $(this.options.mobileMenuTriggerSelector);
        this.navLinks = $$('a[href^="#"]', this.nav);

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupScrollSpy();
    }

    setupMobileMenu() {
        if (!this.mobileMenuTrigger || !this.mobileMenu) return;

        listen(this.mobileMenuTrigger, "click", () => {
            const isExpanded =
                this.mobileMenuTrigger.getAttribute("aria-expanded") === "true";
            this.mobileMenuTrigger.setAttribute("aria-expanded", !isExpanded);
            this.mobileMenu.classList.toggle("hidden");

            // Toggle icon if using Lucide icons
            const icon = this.mobileMenuTrigger.querySelector("i[data-lucide]");
            if (icon) {
                icon.dataset.lucide = isExpanded ? "menu" : "x";
                // Assuming Lucide is already initialized
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            }
        });

        // Close mobile menu on link click
        listen(this.mobileMenu, "click", (e) => {
            if (e.target.matches('a[href^="#"]')) {
                this.mobileMenu.classList.add("hidden");
                this.mobileMenuTrigger.setAttribute("aria-expanded", "false");
            }
        });
    }

    setupScrollBehavior() {
        this.navLinks.forEach((link) => {
            listen(link, "click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href");
                const targetElement = $(targetId);

                if (targetElement) {
                    const offsetTop =
                        targetElement.offsetTop - this.options.headerHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    setupScrollSpy() {
        const sections = this.navLinks
            .map((link) => {
                const targetId = link.getAttribute("href");
                return $(targetId);
            })
            .filter(Boolean);

        const highlightNavLink = throttle(() => {
            const scrollPos = window.scrollY + this.options.headerHeight + 10;

            let currentSection = sections[0];
            sections.forEach((section) => {
                if (section.offsetTop <= scrollPos) {
                    currentSection = section;
                }
            });

            this.navLinks.forEach((link) => {
                link.classList.remove(this.options.activeClass);
                if (
                    currentSection &&
                    link.getAttribute("href") === `#${currentSection.id}`
                ) {
                    link.classList.add(this.options.activeClass);
                }
            });
        }, 100);

        listen(window, "scroll", highlightNavLink);
        // Initial highlight
        highlightNavLink();
    }
}

export const createNavigation = (options) => new Navigation(options);
