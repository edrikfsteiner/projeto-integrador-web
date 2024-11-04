import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class Enderecos {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'int'})
    numero:  number

    @Column({type: 'varchar', length: 8})
    cep: string

    @Column({type: 'varchar', length: 200})
    rua: string

    @Column({type: 'varchar', length: 200})
    bairro: string

    @Column({type: 'varchar', length: 200})
    cidade: string

    @Column({type: 'varchar', length: 2})
    uf: string

}
