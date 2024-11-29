import { IntensCompras } from './itens_compra';
import { Entity, PrimaryGeneratedColumn, Column, Double, IntegerType, OneToMany } from "typeorm"

@Entity()
export class Compras {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'date'})
    data:  Date

    @Column({type: 'decimal'})
    valor: string

    @OneToMany(() => IntensCompras, intensVends => intensVends.compras)
    intensCompras: IntensCompras[]
}