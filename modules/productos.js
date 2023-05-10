//modulos para productos

const express = require("express");
const cors = require("cors"); //para evitar restricciones entre llamadas de sitios
const producto = express.Router(); //trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clietes
const conex = require("./bdatos");

//construimos la capa intermedia de la aplicacion MIDDLEWARD
producto.use(express.json()); //serializa la data en JSON
producto.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
producto.options("*", cors()); //configura las ip admitidas por cors , * significa que l

//codificamos los verbos http (crud tipico)

//verbo GET listar

producto.get("/productos", (req, res) => {
  conex.query("select * from producto", (error, respuesta) => {
    if (error) {
      //throw error;
      console.log(`${error}`);
    } else {
      res.send(respuesta);
    }
  });
});
/*
//verbo POST insertar

producto.post("/api/users", (req, res) => {
  let data = {
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
  };
  conex.query("Insert into users set ?", data, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//verbo Put Editar

ruta.put("/api/users/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
  };
  conex.query(
    "update users set ? where id = ?",
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

ruta.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;
  conex.query("delete from users where id = ?", id, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});
 */
module.exports = producto;
