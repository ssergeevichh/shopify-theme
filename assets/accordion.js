class Accordion extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        const titleClicked = event.target.closest('.accordion-item__title');
        if (!titleClicked) return;

        const accordionItem = titleClicked.closest('.accordion-item');
        if (accordionItem) {
            accordionItem.classList.toggle('accordion-item--open');
        }
    }
}

customElements.define('x-accordion', Accordion);