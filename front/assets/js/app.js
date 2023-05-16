const urlApi = "http://localhost:4000/productos";

const col = document.querySelector("#colProductos");

fetch(urlApi)
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((respuesta) => {
    for (let index = 0; index < respuesta.length; index++) {
      let fila = `<div class="card" style="width: 18rem; padding: 20px; margin: 20px">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${respuesta[index].nombre}</h5>
          <p class="card-text">${respuesta[index].descripcion}</p>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      </div>`;

      col.innerHTML += fila;
    }
  });
