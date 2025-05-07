let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});
cartClose.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Add products to the cart
const addCartButton = document.querySelectorAll(".add-cart");
addCartButton.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

// Cart content section
const cartContent = document.querySelector(".cart-content");

// Function to add items to the cart
const addToCart = (productBox) => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;
    
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" alt="" class="cart-img">
        <div class="cart-details">
            <h2 class="cart-product-title">${productTitle}</h2>
        </div>
        <span class="cart-price">${productPrice}</span>
        <div class="cart-quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;
    
    cartContent.appendChild(cartBox);

    // Remove the product from the cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
        updateCartCount(-1);
    });

    // Handle quantity updates
    cartBox.querySelector(".cart-quantity").addEventListener("click", (event) => {
        const numberElement = cartBox.querySelector(".number");
        let quantity = parseInt(numberElement.textContent);
        
        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
        } else if (event.target.id === "increment") {
            quantity++;
        }
        
        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateTotalPrice();
    updateCartCount(1);
};

// Update total price of the cart
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    
    cartBoxes.forEach((cartBox) => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);
        total += price * quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

// Update cart item count
let cartItemCount = 0;
const updateCartCount = (change) => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

// Handle Buy Now button click
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    // Check if the user is logged in (email and password in localStorage)
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (!email || !password) {
        alert("You need to log in before making a purchase.");
        // Redirect to login page
        window.location.href = "./login.html";
        return;
    }
    
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();

    // Remove email and password from localStorage after purchase
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    alert("Thank you for your purchase!");
    window.location.href = "./index.html";
});

// Save cart data to localStorage when cart is updated
const saveCartToLocalStorage = () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    const cartData = [];

    cartBoxes.forEach((cartBox) => {
        const productTitle = cartBox.querySelector(".cart-product-title").textContent;
        const quantity = cartBox.querySelector(".number").textContent;
        cartData.push({ productTitle, quantity });
    });

    localStorage.setItem("cartData", JSON.stringify(cartData));
};

// Load cart data from localStorage
const loadCartFromLocalStorage = () => {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    if (cartData) {
        cartData.forEach(item => {
            const productBox = document.querySelector(`.product-box .product-title:contains('${item.productTitle}')`).closest(".product-box");
            if (productBox) {
                const quantity = parseInt(item.quantity);
                for (let i = 0; i < quantity; i++) {
                    addToCart(productBox);
                }
            }
        });
    }
};

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
});
