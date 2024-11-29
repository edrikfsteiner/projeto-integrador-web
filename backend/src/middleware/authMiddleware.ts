import { funcionariosRespository } from './../repository/FuncionarioRepository';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type JwtPaylode = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { authorization } = req.headers
    
        if(!authorization?.length) {
            authorization = ''
            return res.status(400).json({message: "nao autorizado"})
        }
    
        const token = authorization.split(' ')[1]
    
        const {id} = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPaylode
    
        const funcionario = await funcionariosRespository.findOneBy({id})
    
        if(!funcionario) {
            return res.status(400).json({message: "nao autorizado"})
        }
    
        const {senha: _, ...looggedUser} = funcionario
    
        req.funcionario = looggedUser
    
        next()  
    } catch (error) {
        return res.status(400).json({message: "nao autorizado"})
    }
}