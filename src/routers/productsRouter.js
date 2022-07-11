import { Router } from "express";
import { FilesystemContainer } from "../Api/FilesystemContainer.js";
import { config } from "../config/index.js";
import { isAdmin } from "../middlewares/index.js";
import { ERRORS_UTILS, JOI_VALIDATOR } from "../utils/index.js";

const productsRouter = Router();

const ProductApi = new FilesystemContainer(config.FILESYSTEM_DB.products);

productsRouter.get("/", async (req, res) => {
  try {
    const products = await ProductApi.getAll();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductApi.getById(id);

    if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.post("/", isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const productSaved = await ProductApi.save(product);

    res.send(productSaved);
  } catch (error) {
    res.send(error);
  }
});

export { productsRouter };
