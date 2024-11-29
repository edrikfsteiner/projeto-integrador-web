import { Enderecos } from './Enderecos';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Vendas } from './Vendas';

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

    @Column({type: 'date'})
    data_nasc: Date

    @ManyToOne(() => Enderecos, enderecos => enderecos.clientes)
    enderecos: Enderecos

    @OneToMany(() => Vendas, enderecos => enderecos.clientes)
    vendas: Vendas[]

}
