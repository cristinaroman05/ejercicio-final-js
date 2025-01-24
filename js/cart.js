//Capturamos elementos necesarios del dom con los que vamos a interactuar
const buttonAddCart = document.querySelectorAll(".grid article button");
const cartSection = document.querySelector("#cart .cart-items");
const buttonCart = document.querySelector(".cartIcon");
const cartAside = document.querySelector("#cart");
const totalSpan = document.querySelector("#cart .cart-total-price");
const checkoutButton = document.querySelector("#cart .checkout-button");
const cartItems = [];

//Creamos funcion para pintar una planta en el carrito que recibe como parámetro el elemento a pintar y sitio del dom donde lo queremos pintar
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
//Creamos la funcion que se va a encargar de pintar la lista de plantas añadidas al carrito y recibe como parámetro la lista de plantas y sitio del dom donde pintarla
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

//Creamos funcion que se encarga de añadir una planta al carrito y comprobar si dicha planta ya existe en el carrito para aumentar la cantidad y no crear el item repetido
function addToCart(event) {
  let item = Number(event.target.dataset.id);
  let plantAdded = plantas.find((plant) => plant.id === item);
  let repeatPlant = cartItems.find((plant) => plant.id === item);

  if (repeatPlant) {
    repeatPlant.cantidad += 1;
  } else {
    cartItems.push({ ...plantAdded, cantidad: 1 });
  }
  if (plantAdded.stock <= 0) {
    alert("No hay mas stock de este producto");
  }
  if (!cartAside.classList.contains("show")) {
    showCart();
  }
  plantAdded.stock -= 1;
  printAllItemsCart(cartItems, cartSection);
  totalCart();
}
//Creamos funcion que se encarga de eliminar el item seleccionado en el carrito
function removeFromCart(event) {
  let item = Number(event.target.dataset.id);
  let itemSelected = cartItems.findIndex((plant) => plant.id === item);
  if (itemSelected !== -1) {
    cartItems.splice(itemSelected, 1);
    printAllItemsCart(cartItems, cartSection);
  }
  if (cartItems.length === 0) {
    totalSpan.textContent = 0;
  }
}
buttonCart.addEventListener("click", showCart);
//Funcion para ocultar o mostrar el carrito cuando se hace click sobre el icono carrito
function showCart(event) {
  cartAside.classList.toggle("show");
}
//Funcion que se encarga de calcular el total del carrito, multiplicando el precio del item por la cantidad y sumandoselo al total
function totalCart() {
  let total = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  totalSpan.textContent = total.toFixed(2);
}
//Funcion que se encarga de actualizar la cantidad recibida en un mismo item
function updateQuantity(id, change) {
  let plant = cartItems.find((plant) => plant.id === id);

  if (plant) {
    plant.cantidad += change;

    if (plant.cantidad < 1) {
      cartItems.splice(cartItems.indexOf(plant), 1);
    }
  }
  change === +1 ? (plant.stock -= 1) : (plant.stock += 1);
  if (plant.stock === 0) {
    alert("No hay mas stock de este producto");
  }
  printAllItemsCart(cartItems, cartSection);
  totalCart();
}
function shopDone(event) {
  if (cartItems.length === 0) {
    alert("No hay productos en el carrito para comprar");
  } else {
    alert("Compra realizada correctamente");
  }
  cartItems.splice(0, cartItems.length);
  printAllItemsCart(cartItems, cartSection);
  totalCart();
}
checkoutButton.addEventListener("click", shopDone);
