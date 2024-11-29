import { Entity, PrimaryGeneratedColumn, Column, Double, OneToMany } from "typeorm"
import { Vendas } from "./Vendas"

@Entity()
export class Funcionarios {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'varchar'})
    usuario: string

    @Column({type: 'varchar'})
    senha: string

    @Column({type: 'int' ,width: 11})
    cpf: number

    @Column({ type: 'int' ,width: 11})
    celular: number

    @Column({type: 'varchar'})
    email: string

    @Column({type: 'varchar'})
    cargo: string

    @Column({type: 'decimal'})
    salario: string

    @Column({type: 'date'})
    data_contratacao: Date

    @OneToMany(() => Vendas, vendas => vendas.Funcionarios)
    vendas: Vendas[]

}
