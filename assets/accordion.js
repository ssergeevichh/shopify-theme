class AccordionItem extends HTMLElement {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback() {
        const title = this.querySelector('[data-accordion-title]');
        if (title) {
          title.addEventListener('click', this.handleClick);
        }
    }

    handleClick() {
        this.removeAllActive();
        this.classList.toggle('accordion-item--open');
    }

    removeAllActive() {
        const items = this.parentElement.querySelectorAll('[data-accordion-item]');
        items.forEach((item) => {
            if (item !== this) {
                item.classList.remove('accordion-item--open');
            }
        });
    }
}

customElements.define('accordion-item', AccordionItem);