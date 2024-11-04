import { AppDataSource } from "../data-source";
import { Produtos } from "../entity/Produtos";

export const  produtoRepository = AppDataSource.getRepository(Produtos)

