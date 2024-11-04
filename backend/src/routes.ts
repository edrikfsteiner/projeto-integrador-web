import { Router } from "express";
import { ClienteController } from "./controller/ClienteController";
import { ProdutoController } from "./controller/ProdutoController";

const routes = Router()

routes.post('/cliente', new ClienteController().create)

routes.post('/estoque', new ProdutoController().create)

routes.get('/estoque', new ProdutoController().getProduto)
routes.put('/estoque/:id', new ProdutoController().putProduto)
routes.delete('/estoque/:id', new ProdutoController().DelProduto)

export default routes