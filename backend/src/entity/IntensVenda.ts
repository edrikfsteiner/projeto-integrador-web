import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class IntensVendas {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'int'})
    CodBarra:  number

    @Column({type: 'decimal'})
    valor: string

    @Column({type: 'int'})
    quantidade: number

}
