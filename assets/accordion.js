if (!customElements.get('accordion-item')) {
    class AccordionItem extends HTMLElement {
        constructor() {
            super();
            this.list = this.closest('accordion-list');
            this.heading = this.querySelector('[data-accordion-title]');
            this.items = document.querySelectorAll('[data-accordion-item]');
            
            this.handleClick = this.handleClick.bind(this);
        }

        connectedCallback() {
            this.heading.addEventListener('click', this.handleClick);
        }

        handleClick() {
            this.list.closeAllExcept(this);
            this.classList.toggle('accordion-item--open');
        }
    }

    customElements.define('accordion-item', AccordionItem);
}