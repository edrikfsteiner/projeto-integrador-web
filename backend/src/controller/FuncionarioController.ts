import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express";
import { funcionariosRespository } from "../repository/FuncionarioRepository";
import bcrypt from 'bcrypt'

export class FuncionariosController {
    async create(req: Request, res: Response) {
        try {
            const {usuario, email, senha, nome, cpf, celular, cargo, salario, data_contratacao} = req.body

            const uemailExist = await funcionariosRespository.findOneBy({ email })
            const senhaExist = await funcionariosRespository.findOneBy({ senha })

            if (uemailExist){
                return res.status(400).json({message: "Email ou senha ja cadastrado "})
            } 

            if(!usuario || !email || !senha || !nome || !cpf || !celular || !cargo || !salario || !data_contratacao) {
                return res.status(400).json({message: "Campo nao prenchido"})
            }

            if (senhaExist){
                return res.status(400).json({message: "Email ou senha ja cadastrado "})
            } 

            const hashPassword = await bcrypt.hash(senha, 10)
            const newFuncionario = funcionariosRespository.create({
                usuario, 
                email,
                nome,
                celular, 
                cpf, 
                cargo, 
                salario, 
                data_contratacao,  
                senha: hashPassword
            })
        
            await funcionariosRespository.save(newFuncionario)

            const {senha: _, ...funcionario} = newFuncionario
            res.status(201).json(funcionario)

        } catch (error) { 
            console.log(error) 
            res.status(400).json(error) 
        }
    }
}