//modulos para productos

const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); //la trae por defecto node js me permite usar async/await opcion a fetch
const { error, log } = require("console");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //configura las ip admitidas por cors , * significa que l

//codificamos los verbos http (crud tipico)

//verbo GET listar

usuario.get("/usuarios", async (req, res) => {
  try {
    conex.query(
      "select id, nombre, apellidos, email from usuario",
      (error, respuesta) => {
        console.log(respuesta);
        res.send(respuesta);
      }
    );
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

/* usuario.get("/usuarios", (req, res) => {
  conex.query("select * from usuario", (error, respuesta) => {
    if (error) {
      //throw error;
      console.log(`${error}`);
    } else {
      res.send(respuesta);
    }
  });
}); */

//verbo POST insertar

usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };

    conex.query("insert into usuario set ?", [data], (error, respuesta) => {
      console.log(respuesta);
      res.send("Insercion exitosa");
      //res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
    //res.send.status(404).error;
  }
});

//Login de usuario

usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //validamos que lleguen los datos completos
    if (!email || !password) {
      console.log("Debe enviar los datos completos");
    } else {
      conex.query(
        "select * from usuario where email = ?",
        [email],
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(password, respuesta[0].password))
          ) {
            console.log(
              "el usuario y/o clave ingresada no existen en la aplicacion"
            );
          } else {
            //Enviamos las variables al frontend para que cargue la pagina
            console.log(
              "Bienvenido al sistema de informacion" + respuesta[0].email,
              respuesta[0].password
            );
          }
        }
      );
    }
  } catch (error) {
    console.log("hay un error en la conexion con el servidor");
  }
});

//verbo Put Editar

usuario.put("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query(
    "update usuario set ? where id = ?",
    [datos, id],
    (error, respuesta) => {
      if (error) {
        console.log(`${error}`);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

//verbo delete eliminar

usuario.delete("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  conex.query("delete from usuario where id = ?", id, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

module.exports = usuario;
