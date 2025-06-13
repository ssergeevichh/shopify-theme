class AccordionItem extends HTMLElement {
    constructor() {
        super();
        this.heading = this.querySelector('[data-accordion-title]');
        this.items = document.querySelectorAll('[data-accordion-item]');
        
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.heading.addEventListener('click', this.handleClick);
    }

    handleClick() {
        this.removeAllActive();
        this.classList.toggle('accordion-item--open');
    }

    removeAllActive() {
        this.items.forEach((item) => {
            if (item !== this) {
                item.classList.remove('accordion-item--open');
            }
        });
    }
}

customElements.define('accordion-item', AccordionItem);