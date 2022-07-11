                                                 //////   SUB RUTAS ////////
/// probar las rutas http://localhost:8080/api/productos  (thunder client o postman) con sus respectivos metodos
import { Router } from "express";     

import { MemoryContainer  } from "../api/MemoryContainer.js"; // type module  o // const Container = require('../Api/Container.js')  // common js

const productRouter = Router();     //// creo una instancia del router // declaro todas las rutas 
const ProductApi = new MemoryContainer ();   //// creo una instancia del container

// /api/productos/
productRouter.get("/", (req, res) => {               ///// devuelvo todos los productos
  const productos = ProductApi.getAll();             ///// me devuelve todo el array

  res.json(productos);                               ////devuelvo productos
});

productRouter.get("/:id", (req, res) => {              ///// devuelvo un producto segun su id que viene por params
  const { id } = req.params;                           ///hago destructuring de obj ara sacar el id => const {id}

  const producto = ProductApi.getById(id);             

  if (!producto) res.json({ error: "Producto no encontrado" });     

  res.json(producto);
});

productRouter.post("/", (req, res) => {                 //// recibe y agrega un producto, y lo devuelve con su id asignado
  const { title, price, thumbnail } = req.body;        ///// recibo por body todos los parametros que queremos guardar 

  const product = { title, price, thumbnail };          ///// productos que me pide el ejercicio 

  const response = ProductApi.save(product);            ///// devuelve el id del elemento creado 

  res.json(response);
});

productRouter.put("/:id", (req, res) => {                  ////// recibe y actualiza un producto segun su id //// nos llega el id por params
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;      

  const updatedProduct = ProductApi.updateById(id, { title, price, thumbnail }); /// recibe id y los nuevos productos 

  if (updatedProduct.error) res.json({ error: "Producto no encontrado" });     

  res.json(updatedProduct);
});

productRouter.delete("/:id", (req, res) => {             ///// elimina un producto segun su id /// nos llega el id por prams
  const { id } = req.params;          

  const response = ProductApi.deleteById(id);

  if (response.error) return res.json({ error: "Producto no encontrado" });

  res.json({ success: "Producto eliminado correctamente" });
});

export { productRouter };