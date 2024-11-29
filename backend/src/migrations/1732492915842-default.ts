import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732492915842 implements MigrationInterface {
    name = 'Default1732492915842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "intens_compras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "custo" numeric NOT NULL, "quantidade" integer NOT NULL, CONSTRAINT "PK_df576f9ed167ba9a71c19388d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" date NOT NULL, "valor" numeric NOT NULL, CONSTRAINT "PK_63037d5249eefe140e3587ff6f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "CodBarra"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "cargo"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "data_contratacao"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "custo" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "codigo_de_barra" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "preco" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "data_nasc" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "celular" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cargo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "salario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "data_contratacao" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "tipo_pagamento" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "preco" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "preco"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "tipo_pagamento"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "data_contratacao"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cargo"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "data_nasc"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "preco"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "codigo_de_barra"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "custo"`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "data_contratacao" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "salario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "cargo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "celular" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "valor" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "CodBarra" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "compras"`);
        await queryRunner.query(`DROP TABLE "intens_compras"`);
    }

}
