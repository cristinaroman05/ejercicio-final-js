const buttonAddCart = document.querySelectorAll(".grid article button");
const cartSection = document.querySelector("#cart .cart-items");
const buttonCart = document.querySelector(".cartIcon");
const cartAside = document.querySelector("#cart");
const totalSpan = document.querySelector("#cart .cart-total-price");
const cartItems = [];

function printOneItemCart(item, dom) {
  const article = document.createElement("article");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  figure.appendChild(img);

  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = item.nombre;
  const span = document.createElement("span");
  span.textContent = `Precio: ${item.precio}€`;

  const divquantity = document.createElement("div");
  const spanQuantity = document.createElement("span");
  spanQuantity.textContent = `Cantidad: ${item.cantidad}`;
  spanQuantity.classList = "quantity";
  divquantity.appendChild(spanQuantity);
  div.append(h3, span, divquantity);

  const buttonRest = document.createElement("button");
  buttonRest.classList = "remove-button";
  buttonRest.textContent = "-";
  buttonRest.dataset.id = item.id;
  buttonRest.addEventListener("click", () => updateQuantity(item.id, -1));

  const buttonSum = document.createElement("button");
  buttonSum.classList = "remove-button";
  buttonSum.textContent = "+";
  buttonSum.dataset.id = item.id;
  buttonSum.addEventListener("click", () => updateQuantity(item.id, +1));

  const button = document.createElement("button");
  button.classList = "remove-button";
  button.textContent = "Eliminar";
  button.dataset.id = item.id;
  button.addEventListener("click", removeFromCart);

  article.append(figure, div, buttonSum, buttonRest, button);
  dom.appendChild(article);
}

function printAllItemsCart(list, dom) {
  dom.innerHTML = "";
  if (cartItems === "") {
    cartSection.classList.add = "empty-cart";
  }
  list.forEach((item) => printOneItemCart(item, dom));
}
buttonAddCart.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  let item = Number(event.target.dataset.id);
  let plantAdded = plantas.find((plant) => plant.id === item);

  let repeatPlant = cartItems.find((plant) => plant.id === item);

  if (repeatPlant) {
    repeatPlant.cantidad += 1;
  } else {
    cartItems.push({ ...plantAdded, cantidad: 1 });
  }
  printAllItemsCart(cartItems, cartSection);
  totalCart();
  /* showCart(); */
}
function removeFromCart(event) {
  let item = Number(event.target.dataset.id);
  let itemSelected = cartItems.findIndex((plant) => plant.id === item);
  if (itemSelected !== -1) {
    cartItems.splice(itemSelected, 1);
    printAllItemsCart(cartItems, cartSection);
  }
}
buttonCart.addEventListener("click", showCart);

function showCart(event) {
  cartAside.classList.toggle("show");
}
function totalCart() {
  let total = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  totalSpan.textContent = total.toFixed(2);
}
function updateQuantity(id, change) {
  let plant = cartItems.find((plant) => plant.id === id);

  if (plant) {
    plant.cantidad += change;

    if (plant.cantidad < 1) {
      cartItems.splice(cartItems.indexOf(plant), 1);
    }
  }

  printAllItemsCart(cartItems, cartSection);
  totalCart();
}
