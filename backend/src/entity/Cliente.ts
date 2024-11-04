import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'varchar'})
    Email: string

    @Column({type: 'int' ,width: 11})
    cpf: number

    @Column({type: 'int' ,width: 11})
    celular: number

}
