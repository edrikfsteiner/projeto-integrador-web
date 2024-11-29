import { Entity, PrimaryGeneratedColumn, Column, Double, IntegerType, ManyToOne } from "typeorm"
import { Compras } from "./compras"
import { Produtos } from "./Produtos"

@Entity()
export class IntensCompras {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'decimal'})
    custo: string

    @Column({type: 'int'})
    quantidade: number

    @ManyToOne(() => Compras, compras => compras.intensCompras)
    compras: Compras

    @ManyToOne(() => Produtos, produtos => produtos.intensCompras)
    produtos: Produtos
}