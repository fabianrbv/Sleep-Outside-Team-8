import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cartItems.push(this.product);
    }

    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.Name} foi adicionado ao carrinho!`);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h3").textContent = product.Brand.Name;
  document.querySelector("h2").textContent = product.NameWithoutBrand;
  document.querySelector(".product-detail img").src = product.Image;
  document.querySelector(".product-card__price").textContent =
    `$${product.FinalPrice}`;
  document.querySelector(".product__color").textContent =
    product.Colors[0].ColorName;
  document.querySelector(".product__description").textContent =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}
