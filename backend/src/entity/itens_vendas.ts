import { Entity, PrimaryGeneratedColumn, Column, Double, IntegerType, ManyToMany, ManyToOne } from "typeorm"
import { Vendas } from "./Vendas"
import { Produtos } from "./Produtos"

@Entity()
export class IntensVendas {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'decimal'})
    custo: string

    @Column({type: 'int'})
    quantidade: number

    @ManyToOne(() => Vendas, vendas => vendas.intensVends)
    vendas: Vendas

    @ManyToOne(() => Produtos, produtos => produtos.intensVends)
    produtos: Produtos
}