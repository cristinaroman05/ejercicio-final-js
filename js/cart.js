const buttonAddCart = document.querySelectorAll(".grid article button");
const cartSection = document.querySelector("#cart .cart-items");
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
  h3.textContent = item.name;
  const span = document.createElement("span");
  span.textContent = `Precio: ${item.price}`;
  div.append(h3, span);

  const button = document.createElement("button");
  button.classList = "remove-button";
  button.textContent = "Eliminar";

  article.append(figure, div, button);
  dom.appendChild(article);
}

function printAllItemsCart(list, dom) {
  list.forEach((item) => printOneItemCart(item, dom));
}
buttonAddCart.forEach((button) => {
  button.addEventListener("click", addToCart());
});

function addToCart(event) {}
