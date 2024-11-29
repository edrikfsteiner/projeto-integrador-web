import { Entity, PrimaryGeneratedColumn, Column, Double, OneToMany } from "typeorm"
import { IntensVendas } from "./itens_vendas"
import { IntensCompras } from "./itens_compra"


@Entity()
export class Produtos {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    codigo_de_barra: string

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'varchar'})
    categoria: string

    @Column({type: 'decimal'})
    preco: string

    @Column({type: 'int'})
    quantidade: number

    @Column({type: 'varchar'})
    laboratorio: string

    @Column({type: 'boolean'})
    farmacia_pop: boolean

    @Column({type: 'boolean'})
    receita: boolean

    @OneToMany(() => IntensVendas, intensVends => intensVends.produtos)
    intensVends: IntensVendas[]

    @OneToMany(() => IntensCompras, intensCompras => intensCompras.produtos)
    intensCompras: IntensCompras[]

}
