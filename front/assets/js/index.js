//variables de entorno

const urlApi = "http://localhost:4000/";

//DOM

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnEnviar = document.querySelector("#btnEnviar");

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((respuesta) => {
      return respuesta.text();
    })
    .then((respuesta) => {
      if (respuesta === "true") {
        window.location = "http://127.0.0.1:5501/front/dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la validacion",
          text: "El Email o contraseña es incorrecto",
        });
      }
    });
});

//DOM Registro

const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const email2 = document.querySelector("#email2");
const password2 = document.querySelector("#password2");
const direccion = document.querySelector("#direccion");
const ciudad = document.querySelector("#ciudad");
const zonaPostal = document.querySelector("#zonaPostal");
const telefono = document.querySelector("#telefono");

const btnCrear = document.querySelector("#btnCrear");

btnCrear.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: email2.value,
      password: password2.value,
      direccion: direccion.value,
      ciudad: ciudad.value,
      zonaPostal: zonaPostal.value,
      telefono: telefono.value,
      esAdmin: 0,
    }),
  })
    .then((respuesta) => {
      return respuesta.text();
    })
    .then((respuesta) => {
      if (respuesta === "true") {
        Swal.fire({
          icon: "success",
          title: "Felicitaciones!",
          text: "Cuenta creada correctamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en la validacion",
          text: "Debe llenar todos los campos",
        });
      }
    });
});
