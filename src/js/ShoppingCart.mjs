import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="../product_pages/index.html?product=${item.Id}">
        <img class="cart-card__image" src="${item.Image}" alt="${item.Name}" />
        <h2 class="cart-card__name">${item.Brand.Name} ${item.Name}</h2>
        <p class="cart-card__color">Color: ${item.Colors[0]}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice(2)}</p>
      </a>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.key = "so-cart";
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCart(cartItems);
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }
}
