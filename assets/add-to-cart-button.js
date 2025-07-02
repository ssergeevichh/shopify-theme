class AddToCartButton extends HTMLElement {
    constructor() {
        super();
        this.quantityInput = document.getElementById('product-quantity-input');

        this.variantsScript = this.querySelector('#product-variants-json');
        this.variants = [];

        this.addToCart = this.addToCart.bind(this);
    }
    
    connectedCallback() {
        this.addButton();
        this.getVariantOptions();
    }

    addButton () {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'add-to-cart-button';
        button.textContent = 'Додати в кошик';
    
        this.appendChild(button);
        this.button = button;
    
        button.addEventListener('click', this.addToCart);
    }

    getVariantOptions() {
        if (this.variantsScript) {
            const parsedData = JSON.parse(this.variantsScript.textContent);
            this.variants = parsedData.productInfo;
        }
    }

    getMatchingVariantId() {
        let selectedOptions = [];
        const checkedInputs = document.querySelectorAll('.product-variant__input:checked');
        checkedInputs.forEach(input => selectedOptions.push(input.value));
    
        const matchingVariant = this.variants.find(variant =>
            variant.options.every((opt, i) => opt === selectedOptions[i])
        );
    
        return matchingVariant ? matchingVariant.id : null;
    }
  
    addToCart() {
        const variantId = this.getMatchingVariantId();
        const quantity = parseInt(this.quantityInput?.value || '1', 10);
  
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: variantId,
                quantity: quantity
            })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(() => {
            alert('Товар додано до кошика');
        })
        .catch(() => {
            alert('Помилка при додаванні');
        });
    }
}
  
customElements.define('add-to-cart-button', AddToCartButton);
  