import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartContainer = document.querySelector(".product-list");

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<li class="empty-cart-message">Your cart is empty</li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => {
    const imageSrc = item.Image || "../images/default-product.jpg";
    const name = item.NameWithoutBrand || item.Name || "Unnamed Product";
    const color = item.Colors?.[0]?.ColorName || "No color specified";
    const price = item.FinalPrice ? `$${item.FinalPrice}` : "$0.00";
    const quantity = item.quantity || 1;

    return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${imageSrc}" alt="${name}">
      </a>
      <a href="#">
        <h2 class="card__name">${name}</h2>
      </a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: ${quantity}</p>
      <p class="cart-card__price">${price}</p>
    </li>`;
  });
  cartContainer.innerHTML = htmlItems.join("");
}

document.addEventListener("DOMContentLoaded", renderCartContents);
