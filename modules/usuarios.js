//modulos para productos

const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
usuario.options("*", cors()); //configura las ip admitidas por cors , * significa que l

//codificamos los verbos http (crud tipico)

//verbo GET listar

usuario.get("/usuarios", (req, res) => {
  conex.query("select * from usuario", (error, respuesta) => {
    if (error) {
      //throw error;
      console.log(`${error}`);
    } else {
      res.send(respuesta);
    }
  });
});

//verbo POST insertar

usuario.post("/usuarios", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
  };
  conex.query("Insert into usuario set ?", data, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//verbo Put Editar

usuario.put("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
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
