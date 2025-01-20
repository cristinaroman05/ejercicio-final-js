const buttonAddCart = document.querySelectorAll(".grid article button");
buttonAddCart.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  alert("Agregado al carrito");
}
