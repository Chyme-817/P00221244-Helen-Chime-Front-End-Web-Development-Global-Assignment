const CART_STORAGE_KEY = 'beanBoutiqueCart';

function getCartItems() {
    try {
        const savedItems = localStorage.getItem(CART_STORAGE_KEY);
        return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
        return [];
    }
}

function saveCartItems(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function addToCart(itemName) {
    const items = getCartItems();
    const existingItem = items.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ name: itemName, quantity: 1 });
    }

    saveCartItems(items);
    alert(itemName + " has been added to your cart!");
}

function subscribePlan(planName) {
    addToCart(planName);
}

function filterCoffee() {
    const searchValue = document.getElementById('coffeeSearch')?.value.trim().toLowerCase() || '';
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();
        const matches = cardText.includes(searchValue);
        card.style.display = matches ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('coffeeSearch');

    if (searchInput) {
        searchInput.addEventListener('keyup', filterCoffee);
    }

    document.querySelectorAll('.btn[data-coffee-name], .btn[data-product-name], .btn1[data-plan-name]').forEach((button) => {
        button.addEventListener('click', () => {
            const planName = button.getAttribute('data-plan-name');

            if (planName) {
                subscribePlan(planName);
                return;
            }

            const productName = button.getAttribute('data-coffee-name') || button.getAttribute('data-product-name');

            if (productName) {
                addToCart(productName);
            }
        });
    });

    const eventForm = document.getElementById('eventForm');

    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullName')?.value.trim() || 'Guest';
            const workshop = document.getElementById('workshop')?.value || 'selected workshop';
            alert(`Thank you, ${name}! Your registration for ${workshop} has been received.`);
            eventForm.reset();
        });
    }
});

 const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you for reaching out! We will get back to you shortly.');
      contactForm.reset();
    });
  }