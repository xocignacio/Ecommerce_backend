import { Router } from "express";
import { FilesystemContainer } from "../Api/FilesystemContainer.js";
import { config } from "../config/index.js";
import { ERRORS_UTILS } from "../utils/index.js";

const cartsRouter = Router();

const CartApi = new FilesystemContainer(config.FILESYSTEM_DB.carts);
const ProductsApi = new FilesystemContainer(config.FILESYSTEM_DB.products);

const BASE_CART = {
  products: [],
};

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await CartApi.save(BASE_CART);
    const cartId = cart.id;
    res.send({ id: cartId });
  } catch (error) {
    res.send(error);
  }
});

cartsRouter.post("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const cart = await CartApi.getById(id);

    if (!cart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

    const product = await ProductsApi.getById(productId);

    if (!product) res.send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

    cart.products.push(product);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
  } catch (error) {
    res.send(error);
  }
});

cartsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CartApi.getById(id);

    if (!cart) res.send({ error: ERRORS_UTILS.MESSAGES.NO_CART });

    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

export { cartsRouter };
