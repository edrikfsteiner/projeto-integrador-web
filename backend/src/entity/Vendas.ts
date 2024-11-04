import { Entity, PrimaryGeneratedColumn, Column, Double, IntegerType } from "typeorm"

@Entity()
export class Vendas {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'date'})
    data:  Date

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

}
