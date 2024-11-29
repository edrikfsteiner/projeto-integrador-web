import { Router } from "express";
import { ClienteController } from "./controller/ClienteController";
import { ProdutoController } from "./controller/ProdutoController";
import { FuncionariosController } from "./controller/FuncionarioController";
import { LoginController } from "./controller/LoginController";
import { authMiddleware } from "./middleware/authMiddleware";

const routes = Router()

routes.post('/register', new FuncionariosController().create)
routes.post('/login', new LoginController().login)

routes.use(authMiddleware)

routes.post('/cliente', new ClienteController().create)
routes.get('/profile', new LoginController().getprofile)
routes.post('/estoque', new ProdutoController().create)
routes.get('/estoque', new ProdutoController().getProduto)
routes.put('/estoque/:id', new ProdutoController().putProduto)
routes.delete('/estoque/:id', new ProdutoController().DelProduto)

export default routes