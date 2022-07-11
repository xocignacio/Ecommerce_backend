import { Router } from "express";     

import { MemoryContainer   } from "../api/MemoryContainer.js"; 

const CarritoRouter = Router();    
const CarritoApi = new MemoryContainer ();   

// /api/carrito/
CarritoRouter.get("/", (req, res) => {              
  const productos = CarritoApi.getAll();             

  res.json(productos);                               
});

CarritoRouter.get("/:id", (req, res) => {            
  const { id } = req.params;                           

  const producto = CarritoApi.getById(id);             

  if (!producto) res.json({ error: "Producto no encontrado" });     

  res.json(producto);
});

CarritoRouter.post("/", (req, res) => {                 
  const { title, price, thumbnail } = req.body;        

  const product = { title, price, thumbnail };          

  const response = CarritoApi.save(product);            

  res.json(response);
});

CarritoRouter.put("/:id", (req, res) => {                 
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;      

  const updatedProduct = CarritoApi.updateById(id, { title, price, thumbnail }); 

  if (updatedProduct.error) res.json({ error: "Producto no encontrado" });     

  res.json(updatedProduct);
});

CarritoRouter.delete("/:id", (req, res) => {            
  const { id } = req.params;          

  const response = CarritoApi.deleteById(id);

  if (response.error) return res.json({ error: "Producto no encontrado" });

  res.json({ success: "Producto eliminado correctamente" });
});

export { CarritoRouter};