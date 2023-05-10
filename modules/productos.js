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

//verbo POST insertar

producto.post("/productos", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query("Insert into producto set ?", data, (error, respuesta) => {
    if (error) {
      console.log(`${error}`);
    } else {
      res.status(201).send(respuesta);
    }
  });
});

//verbo Put Editar

producto.put("/productos/:id", (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query(
    "update producto set ? where idProducto = ?",
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

producto.delete("/productos/:id", (req, res) => {
  let id = req.params.id;
  conex.query(
    "delete from producto where idProducto = ?",
    id,
    (error, respuesta) => {
      if (error) {
        console.log(`${error}`);
      } else {
        res.status(201).send(respuesta);
      }
    }
  );
});

module.exports = producto;
