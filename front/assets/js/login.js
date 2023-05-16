const urlApi = "http://localhost:4000/login";

const btnLogin = document.querySelector("#btnLogin");

const Inputemail = document.querySelector("#email");
const Inputpass = document.querySelector("#password");

const em = "jpgranada@gmail.com";
const pas = "12345";

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: Inputemail.value,
      password: Inputpass.value,
    }),
  })
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((respuesta) => {
      location.reload();
    });
});
