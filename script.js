const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

const apiData = {
  original_total_price: 250000,
  items: [
    {
      id: 49839206859071,
      quantity: 1,
      title: "Asgaard sofa",
      price: 25000000,
      line_price: 25000000,
      image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
      product_description: "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials.",
    },
  ],
  currency: "INR",
};

// Fetch cart data (using static API for now)
function fetchCartData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(apiData), 1000);
  });
}

// Update cart totals
function updateCartTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.line_price, 0);
  subtotalElement.textContent = `₹${(subtotal / 100).toLocaleString()}`;
  totalElement.textContent = `₹${(subtotal / 100).toLocaleString()}`;
}

// Render cart items
function renderCartItems(items) {
  cartItemsContainer.innerHTML = '';
  items.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <p>₹${(item.price / 100).toLocaleString()}</p>
        <input class="quantity-input" type="number" value="${item.quantity}" min="1">
        <p>Subtotal: ₹${(item.line_price / 100).toLocaleString()}</p>
      </div>
      <button class="remove-btn">🗑</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Update quantity
    cartItem.querySelector('.quantity-input').addEventListener('input', (e) => {
      item.quantity = parseInt(e.target.value);
      item.line_price = item.price * item.quantity;
      updateCartTotals(items);
      renderCartItems(items);
    });

    // Remove item
    cartItem.querySelector('.remove-btn').addEventListener('click', () => {
      const index = items.indexOf(item);
      items.splice(index, 1);
      updateCartTotals(items);
      renderCartItems(items);
    });
  });
}

// Initialize cart
async function initCart() {
  const cartData = await fetchCartData();
  const items = cartData.items;
  updateCartTotals(items);
  renderCartItems(items);
}

checkoutBtn.addEventListener('click', () => {
  alert('Proceeding to checkout...');
});

initCart();
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

