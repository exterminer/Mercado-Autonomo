import { NextFunction, Request, Response } from "express";
import market from "./databases";


const checkName = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { name } = req.body;
  if (market.includes(name)) {
    return res.status(400).json({ error: "Product already registered." });
  }
  next();
};

const checkID = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { id } = req.params;
  const product = market.find((product) => product.id.toString() === id);
  if (product) {
    next();
  } else {
    return res.status(404).json({ message: "Product not found." });
  }
};

export default { checkName, checkID };
