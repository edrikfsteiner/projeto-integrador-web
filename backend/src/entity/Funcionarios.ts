import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class Funcionarios {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'decimal'})
    valor: string

}
