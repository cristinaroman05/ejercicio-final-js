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
  div.append(h3, span);

  const button = document.createElement("button");
  button.classList = "remove-button";
  button.textContent = "Eliminar";
  button.dataset.id = item.id;
  button.addEventListener("click", removeFromCart);
  article.append(figure, div, button);
  dom.appendChild(article);
}

function printAllItemsCart(list, dom) {
  if (cartItems === "") {
    cartSection.classList.add = "empty-cart";
  }
  dom.innerHTML = "";
  list.forEach((item) => printOneItemCart(item, dom));
}
buttonAddCart.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  let item = Number(event.target.dataset.id);
  let plantAdded = plantas.find((plant) => plant.id === item);
  cartItems.push(plantAdded);
  console.log(cartItems);
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
  let total = cartItems.reduce((total, item) => total + item.precio, 0);
  totalSpan.textContent = total;
}
