// FAQ Section Interactions
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const button = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all items
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");
                const otherContent =
                    otherItem.querySelector(".accordion-content");
                otherContent.style.maxHeight = null;
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
