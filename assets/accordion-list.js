if (!customElements.get('accordion-list')) {
    class AccordionList extends HTMLElement {
        constructor() {
            super();
            this.items = this.querySelectorAll('[data-accordion-item]');
        }

        closeAllExcept(currentItem) {
            this.items.forEach((item) => {
                if (item !== currentItem) {
                    item.classList.remove('accordion-item--open');
                }
            });
        }
    }

    customElements.define('accordion-list', AccordionList);
}