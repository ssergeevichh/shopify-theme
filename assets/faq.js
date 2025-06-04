function toggleFAQ(event) {
    const titleClicked = event.target.closest('.faq-item__title');
    if (!titleClicked) return;

    const faqItem = titleClicked.closest('.faq-item');
    if (faqItem) {
        faqItem.classList.toggle('faq-item--open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('FAQ script loaded');
    
    const faqSection = document.querySelector('.faq-content');
    if (faqSection) {
        faqSection.addEventListener('click', toggleFAQ);
    }
})