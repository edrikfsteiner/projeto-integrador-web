import { Funcionarios } from "../entity/Funcionarios";

declare global {
    namespace Express {
        export interface Request {
            funcionario: Partial<Funcionarios> 
        }
    }
}