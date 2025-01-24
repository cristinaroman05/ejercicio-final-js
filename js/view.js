//Capturamos los elementos del dom con los que vamos a querer interactuar
const sectionGrid = document.querySelector("#sectionGrid .grid");

//Creamos la función que va a pintar un único elemento, el cual recibe por parámetro, una planta y un sitio del dom donde queremos pintarlo
function printOnePlant(plant, dom) {
  const article = document.createElement("article");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = plant.image;
  img.alt = plant.nombre;
  figure.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = plant.nombre;

  const p = document.createElement("p");
  p.textContent = plant.description;

  const p2 = document.createElement("p");
  p2.textContent = `Precio: ${plant.precio} €`;

  const button = document.createElement("button");
  button.textContent = "Agregar al carrito";
  button.dataset.id = plant.id;

  article.append(figure, h3, p, p2, button);
  dom.appendChild(article);
}
//Creamos la función que va a pintar todas las plantas, pasándole como parametro la lista de plantas y el sitio del dom donde queremos pintarlo y llamamos a la funcion pintar una planta para cada planta
function printAllPlants(list, dom) {
  list.forEach((plant) => printOnePlant(plant, dom));
}
printAllPlants(plantas, sectionGrid);
