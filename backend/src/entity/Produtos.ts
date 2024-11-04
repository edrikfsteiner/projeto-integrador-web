import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class Produtos {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'varchar'})
    categoria: string

    @Column({type: 'decimal'})
    valor: string

    @Column({type: 'int'})
    quantidade: number

    @Column({type: 'varchar'})
    laboratorio: string

    @Column({type: 'boolean'})
    farmacia_pop: boolean

    @Column({type: 'boolean'})
    receita: boolean

}
