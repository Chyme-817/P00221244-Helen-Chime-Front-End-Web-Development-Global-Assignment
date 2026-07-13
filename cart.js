const CART_STORAGE_KEY = 'beanBoutiqueCart';

function getCartItems() {
    try {
        const savedItems = localStorage.getItem(CART_STORAGE_KEY);
        return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
        return [];
    }
}

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');

    if (!cartItemsContainer || !cartTotalElement) {
        return;
    }

    const items = getCartItems();

    if (items.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">Your cart is empty.</td></tr>';
        cartTotalElement.innerHTML = '<strong>Estimated Total:</strong> MWK0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = items.map((item) => {
        const price = item.name.includes('Subscription') || item.name.includes('Choice') || item.name.includes('Enthusiast') || item.name.includes('Connoisseur')
            ? 2500
            : 6500;
        const itemTotal = price * item.quantity;
        total += itemTotal;
        return `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>MWK${itemTotal.toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    cartTotalElement.innerHTML = `<strong>Estimated Total:</strong> MWK${total.toLocaleString()}.00`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const purchaseButton = document.getElementById('purchaseButton');

    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            localStorage.removeItem('beanBoutiqueCart');
            renderCart();
            alert('Thank you for shopping at Bean Boutique!');
        });
    }
});
