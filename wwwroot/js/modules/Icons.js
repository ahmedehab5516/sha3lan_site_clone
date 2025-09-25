export class Icons {
    constructor() {
        this.init();
    }

    init() {
        // Check if Lucide is available
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        } else {
            console.warn("Lucide icons library not found");
        }
    }

    // Method to refresh icons (useful after dynamic content changes)
    refresh() {
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }
}

export const createIcons = () => new Icons();
