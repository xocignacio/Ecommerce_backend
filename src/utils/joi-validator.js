import joi from "joi";

/* npm i joi  */

// nos devuelve el schema que va a ser una función a la que podemos pasarle un objeto y lo valide, si las propiedades estan bien van a devolver un objeto y si no, devuelve una excepción que podemos atrapar con el catch
// Se puede ver el uso en el archivo productsRouter, linea 38
const product = joi.object({
  nombre: joi.string().min(3).max(45).required(),
  descripcion: joi.string().min(5).max(60).required(),
  codigo: joi.string().min(3).max(8).required(),
  foto: joi.string().min(5).max(180).required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
});

export const JOI_VALIDATOR = {
  product,
};
