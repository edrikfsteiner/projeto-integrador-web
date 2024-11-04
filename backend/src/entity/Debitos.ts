import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class Debitos {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: 'date'})
    data:  Date

    @Column({type: 'decimal'})
    valor: string

}
