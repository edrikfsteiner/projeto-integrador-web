import { AppDataSource } from "../data-source";
import { Funcionarios } from "../entity/Funcionarios";

export const funcionariosRespository = AppDataSource.getRepository(Funcionarios)