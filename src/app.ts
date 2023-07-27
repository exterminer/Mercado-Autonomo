import express, { Application, Request, Response, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";
const app: Application = express();
app.use(json());
const Port: number = 3000;

app.listen(Port, (): void =>
  console.log(`Application is running on port ${Port}`)
);

app.get("/products", logics.getAll);
app.post("/products", middlewares.checkName, logics.create);
app.get("/products/:id", middlewares.checkID, logics.getOne);
app.patch("/products/:id", middlewares.checkID, middlewares.checkName, logics.patchOne,middlewares.checkName);
app.delete("/products/:id", middlewares.checkID, logics.deleteProduct );
