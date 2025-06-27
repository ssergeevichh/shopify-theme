class ProductQuantity extends HTMLElement {
    constructor() {
        super();
        this.quantityInput = this.querySelector('[quantity-input]');
        this.maxQuantity = parseInt(this.quantityInput.getAttribute('max'), 10) || Infinity;

        this.increaseButton = this.querySelector('[quantity-increase]');
        this.decreaseButton = this.querySelector('[quantity-decrease]');
    
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
    }
    
    connectedCallback() {
        if (this.increaseButton) {
            this.increaseButton.addEventListener('click', this.handleIncrease);
        }
        if (this.decreaseButton) {
            this.decreaseButton.addEventListener('click', this.handleDecrease);
        }
    }
    
    handleIncrease() {
        const currentValue = parseInt(this.quantityInput.value, 10) || 0;
        if (currentValue < this.maxQuantity) {
            this.quantityInput.value = currentValue + 1;
        }
    }
    
    handleDecrease() {
        const currentValue = parseInt(this.quantityInput.value, 10) || 0;
        if (currentValue > 1) {
            this.quantityInput.value = currentValue - 1;
        }
    }
}

customElements.define('product-quantity', ProductQuantity);