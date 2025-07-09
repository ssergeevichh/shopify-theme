class MiniCart extends HTMLElement {
    constructor() {
        super();
        this.openMiniCartButton = document.querySelector('[mini-cart-open]');
        this.cartCount = document.querySelector('[mini-cart-count]');
    }

    connectedCallback() {
        this.openMiniCartButton.addEventListener('click', this.refreshMiniCart.bind(this, { open: true, updateBadge: false }));
    }
    
    async refreshMiniCart({ open = false, updateBadge = false } = {}) {
        return fetch('/cart.js')
          .then(res => res.json())
          .then(async cart => {
            if (updateBadge) {
              this.updateBadgeCount(cart.item_count);
            }
      
            const res = await fetch('/?sections=mini-cart');
            const data = await res.json();
            const html = data['mini-cart'];
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('#shopify-section-mini-cart')?.innerHTML;
            
            if (!!content) {
                this.innerHTML = content;
                if (open) {
                    setTimeout(() => {
                        this.classList.add('mini-cart--open');
                    }, 0);
                }
                this.addCloseHandler();
            }
          });
      }
      

    addCloseHandler() {
        const closeBtn = this.querySelector('[mini-cart-close]');
        if (closeBtn) {
            closeBtn.addEventListener('click', this.closeMiniCart.bind(this));
        }
    }

    updateBadgeCount(count, ) {
        if (this.cartCount) {
            this.cartCount.textContent = count;
        } 
    }

    closeMiniCart() {
        this.classList.remove('mini-cart--open');
    }
}

customElements.define('mini-cart', MiniCart);