import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { funcionariosRespository } from "../repository/FuncionarioRepository";
import bcrypt from 'bcrypt'


export class LoginController {
    async login(req:Request, res: Response) {
        const {email, senha} = req.body

        const funcionario = await funcionariosRespository.findOneBy({ email })

        if (!funcionario){
            return res.status(400).json({message: "funcionario nao cadastrado"})
        } 

        const verifyPass = await bcrypt.compare(senha, funcionario.senha)

        if (!verifyPass) {
            return res.status(400).json({message: "Email ou senha ja cadastrado "})
        }

        const token = jwt.sign({id: funcionario.id}, process.env.JWT_PASS ?? '', {expiresIn: "7h"})

        const {senha: _, ...funcLogin} = funcionario

        return res.json({funcionario: funcLogin, token: token})
    }

    async getprofile(req:Request, res: Response) {
        return res.json(req.funcionario)
    }
}