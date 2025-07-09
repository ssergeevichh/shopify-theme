class AddToCartButton extends HTMLElement {
    constructor() {
        super();
        this.miniCart = document.querySelector('mini-cart');
        this.quantityInput = document.getElementById('product-quantity-input');

        this.variantsScript = this.querySelector('#product-variants-json');
        this.variants = [];

        this.addToCart = this.addToCart.bind(this);
    }
    
    connectedCallback() {
        this.getVariantOptions();

        this.addEventListener('click', this.addToCart);
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

    setLoadingState(loading) {
        const button = this;
        const buttonText = button.querySelector('[add-button-text]');

        if (loading) {
            button.classList.add('loading');
            buttonText.textContent = 'Додається до кошика';
            this.disabled = true;
        } else {
            button.classList.remove('loading');
            buttonText.textContent = 'Додати в кошик';
            this.disabled = false;
        }
    }
  
    addToCart() {
        const variantId = this.getMatchingVariantId();
        const quantity = parseInt(this.quantityInput?.value || '1', 10);

        this.setLoadingState(true);
  
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
            this.setLoadingState(false);
            this.miniCart.refreshMiniCart({ open: true, updateBadge: true })
        })
        .catch(() => {
            this.setLoadingState(false);
            alert('Помилка при додаванні');
        });
    }
}
  
customElements.define('add-to-cart-button', AddToCartButton);
  