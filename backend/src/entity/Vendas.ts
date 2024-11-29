import { Entity, PrimaryGeneratedColumn, Column, Double, IntegerType, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Clientes } from "./Cliente"
import { Funcionarios } from "./Funcionarios"
import { IntensVendas } from "./itens_vendas"

@Entity()
export class Vendas {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'date'})
    data:  Date

    @Column({type: 'decimal'})
    valor: string

    @Column({type: 'varchar'})
    tipo_pagamento: string

    @ManyToOne(() => Clientes, clientes => clientes.vendas)
    clientes: Clientes

    @ManyToOne(() => Funcionarios, Funcionarios => Funcionarios.vendas)
    Funcionarios: Funcionarios

    @OneToMany(() => IntensVendas, intensVends => intensVends.vendas)
    intensVends: IntensVendas[]
    

}
