// JavaScript for Hassam-ud-Din Shop

// Dummy Data for Products
const products = [
    { id: 1, name: "Bayer Pesticide", category: "Pesticides", price: 500, company: "Bayer Crop Science", usage: "For pest control on crops.", reviews: 4.5 },
    { id: 2, name: "FMC Herbicide", category: "Herbicides", price: 450, company: "FMC", usage: "For weed management.", reviews: 4.3 },
    { id: 3, name: "Engro Fertilizer", category: "Fertilizers", price: 600, company: "Engro", usage: "Improves soil fertility.", reviews: 4.8 },
    { id: 4, name: "Arysta Fungicide", category: "Fungicides", price: 700, company: "Arysta Life Sciences", usage: "For fungal infections on crops.", reviews: 4.6 },
    // Add more products here
];
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const city = 'YOUR_CITY'; // Replace with your desired city

async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = '<h2>7-Day Forecast</h2>';

    data.list.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `
            <span>${new Date(day.dt * 1000).toLocaleDateString()}</span>
            <span>${day.temp.day}°C</span>
        `;
        weatherWidget.appendChild(dayElement);
    });
}

fetchWeather();
// Cart Array
let cart = [];

// Function to Render Products
function renderProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="https://via.placeholder.com/250x150" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Company: ${product.company}</p>
            <p>Price: Rs. ${product.price}</p>
            <p>Usage: ${product.usage}</p>
            <p>Rating: ${product.reviews} &#9733;</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(productCard);
    });
}

// Function to Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
        alert(`${product.name} has been added to your cart.`);
    }
}

document.getElementById('left-arrow').addEventListener('click', function() {
    const carousel = document.getElementById('product-carousel');
    carousel.scrollBy({
        top: 0,
        left: -200, // Adjust this value based on the width of your product cards
        behavior: 'smooth'
    });
});

document.getElementById('right-arrow').addEventListener('click', function() {
    const carousel = document.getElementById('product-carousel');
    carousel.scrollBy({
        top: 0,
        left: 200, // Adjust this value based on the width of your product cards
        behavior: 'smooth'
    });
});
// Function to Render Cart
function updateCart() {
    const cartContainer = document.getElementById("cart-items"); // Updated to match the new HTML
    const totalAmount = document.getElementById("total-amount");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: Rs. ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = `Total: Rs. ${total}`;
}

// Function to Remove Product from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    alert("Product removed from cart.");
}

// Payment Methods Handling
function handlePayment(method) {
    alert(`You selected ${method} as your payment method.`);
}

// Initialize Page
renderProducts();

// Event Listeners for Payment Methods
document.getElementById("easypaisa-btn").addEventListener("click", () => handlePayment("Easypaisa"));
document.getElementById("jazzcash-btn").addEventListener("click", () => handlePayment("JazzCash"));
document.getElementById("debitcard-btn").addEventListener("click", () => handlePayment("Debit Card"));
