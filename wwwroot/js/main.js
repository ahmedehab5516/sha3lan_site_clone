// Add error handling for module loading
window.addEventListener(
    "error",
    function (e) {
        console.error("Script error:", e);
    },
    true
);

// Ensure Lucide is available
if (!window.lucide) {
    console.error("Lucide icons library not loaded");
}

// Import our modules
try {
    const modules = await Promise.all([
        import("./modules/Icons.js"),
        import("./modules/Navigation.js"),
        import("./modules/Accordion.js"),
        import("./modules/FAQ.js"),
        import("./modules/ScrollAnimations.js"),
    ]);

    const [
        { createIcons },
        { createNavigation },
        { createAccordion },
        { createFAQ },
        { createScrollAnimations },
    ] = modules;

    // Initialize all modules when DOM is ready
    function initializeModules() {
        console.log("Initializing modules...");

        // Initialize icons first as other components might need them
        const icons = createIcons();
        console.log("Icons initialized");

        // Initialize navigation
        const navigation = createNavigation({
            headerHeight: 80,
            mobileBreakpoint: 768,
        });
        console.log("Navigation initialized");

        // Initialize accordions
        const accordions = createAccordion({
            containerSelector: "[data-accordion]",
            allowMultiple: false,
        });
        console.log("Accordions initialized");

        // Initialize FAQ section
        const faq = createFAQ({
            containerSelector: "#faq-section",
            allowMultiple: false,
        });
        console.log("FAQ initialized");

        // Initialize scroll animations
        const scrollAnimations = createScrollAnimations({
            once: true,
            threshold: 0.2,
        });
        console.log("Scroll animations initialized");

        // Export instances for potential use in other scripts
        window.furnitureSouq = {
            icons,
            navigation,
            accordions,
            faq,
            scrollAnimations,
        };

        console.log("All modules initialized successfully");
    }

    // Check if DOM is already loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeModules);
    } else {
        initializeModules();
    }
} catch (error) {
    console.error("Error loading modules:", error);
}
