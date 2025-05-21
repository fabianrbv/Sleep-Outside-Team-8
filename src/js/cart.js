import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartContainer = document.querySelector(".product-list");

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<li class="empty-cart-message">Your cart is empty</li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  cartContainer.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const imageSrc = item.Image || "../images/default-product.jpg";
  const colorName = item.Colors?.[0]?.ColorName || "No color specified";
  const finalPrice = item.FinalPrice ? `$${item.FinalPrice}` : "$0.00";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name || "Product image"}">
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name || "Unnamed Product"}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">${finalPrice}</p>
  </li>`;
}

document.addEventListener("DOMContentLoaded", renderCartContents);
