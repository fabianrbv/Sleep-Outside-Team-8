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
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE",
    {
      style: "currency", currency: "EUR",
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}

// function productDetailsTemplate(product) {
//   document.querySelector("h2").textContent = product.Brand.Name;
//   document.querySelector("h3").textContent = product.NameWithoutBrand;

//   const productImage = document.getElementById("productImage");
//   productImage.src = product.Image;
//   productImage.alt = product.NameWithoutBrand;

//   document.getElementById("productPrice").textContent = product.FinalPrice;
//   document.getElementById("productColor").textContent = product.Colors[0].ColorName;
//   document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

//   document.getElementById("addToCart").dataset.id = product.Id;

//     // discount 
//   const original = product.SuggestedRetailPrice;
//   const current = product.FinalPrice;

//   if (original > current) {
//     const discountPercent = Math.round(((original - current) / original) * 100);
//     const discountBadge = document.createElement("span");
//     discountBadge.textContent = `${discountPercent}% OFF`;

//     const priceElement = document.getElementById("productPrice");
//     priceElement.insertAdjacentElement("afterend", discountBadge);
//      }
// }