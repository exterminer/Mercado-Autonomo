import { Request, Response } from "express";
import market from "./databases";
import { Product } from "./interfaces";

const create = (req: Request, res: Response): Response => {
  const newProduct: Product = {
    ...req.body,
    id: market.length + 1,
    expirationDate: new Date(),
  };
  market.push(newProduct);

  return res.status(201).json(newProduct);
};

const getAll = (req: Request, res: Response): Response => {
  return res.status(200).json({ total: market.length, market });
};

const getOne = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const productId = Number(id);
  const product = market.find((product) => product.id === productId);

  return res.status(200).json(product);
};

const patchOne = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const productId = Number(id);
  const product = market.findIndex((product) => product.id === productId);

  const { name, price, weight, calories } = req.body;

  const updatedProduct = {
    ...market[product],
    name: name || market[product].name,
    price: price || market[product].price,
    weight: weight || market[product].weigth,
    calories: calories || market[product].calories,
  };

  market[product] = updatedProduct;

  return res.status(200).json(updatedProduct);
};
const deleteProduct = (req: Request, res: Response): Response => {
  const { id } = req.params;
  const productId = Number(id);
  const product = market.findIndex((product) => product.id === productId);

  const deletedProduct = market.splice(product, 1);

  return res.status(204).end();
};
export default { create, getAll, getOne, patchOne, deleteProduct };
