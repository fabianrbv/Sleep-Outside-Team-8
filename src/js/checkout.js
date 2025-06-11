import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  const myForm = document.forms[0];
  const isValid = myForm.checkValidity();
  myForm.reportValidity();

  if (!isValid) return;

  try {
    await order.checkout();
    
  } catch (err) {
    if (err.name === "servicesError") {
      alertMessage(`Error: ${err.message.message || "There was a problem with the order"}`);
    } else {
      alertMessage("An unexpected error occurred. Please try again.");
    }
  }
});
