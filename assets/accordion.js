class AccordionItem extends HTMLElement {
    constructor() {
        super();
        this.title = this.querySelector('[data-accordion-title]');
        this.items = this.querySelectorAll('[data-accordion-item]');
        
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        this.title.addEventListener('click', this.handleClick);
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