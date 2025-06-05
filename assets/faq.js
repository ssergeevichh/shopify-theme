class FAQAccordion extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        const titleClicked = event.target.closest('.faq-item__title');
        if (!titleClicked) return;

        const faqItem = titleClicked.closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('faq-item--open');
        }
    }
}

customElements.define('faq-accordion', FAQAccordion);