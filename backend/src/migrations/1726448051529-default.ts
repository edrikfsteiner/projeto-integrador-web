import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726448051529 implements MigrationInterface {
    name = 'Default1726448051529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numero" integer NOT NULL, "cep" character varying(8) NOT NULL, "rua" character varying(200) NOT NULL, "bairro" character varying(200) NOT NULL, "cidade" character varying(200) NOT NULL, "uf" character varying(2) NOT NULL, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" date NOT NULL, "cpf" integer NOT NULL, "celular" integer NOT NULL, "email" character varying NOT NULL, "cargo" character varying NOT NULL, "salario" numeric NOT NULL, "data_contratacao" date NOT NULL, CONSTRAINT "PK_371c42d415efbac7097bd08b744" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "categoria" character varying NOT NULL, "valor" numeric NOT NULL, "quantidade" integer NOT NULL, "laboratorio" character varying NOT NULL, "farmacia_pop" boolean NOT NULL, "receita" boolean NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "funcionarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "valor" numeric NOT NULL, CONSTRAINT "PK_a6ee7c0e30d968db531ad073337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intens_vendas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CodBarra" integer NOT NULL, "valor" numeric NOT NULL, "quantidade" integer NOT NULL, CONSTRAINT "PK_01f7ff9fc10622597eead48f49b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "debitos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" date NOT NULL, "valor" numeric NOT NULL, CONSTRAINT "PK_8d6c87822d8c7b684dfc3e3451f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "Email" character varying NOT NULL, "cpf" integer NOT NULL, "celular" integer NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "debitos"`);
        await queryRunner.query(`DROP TABLE "intens_vendas"`);
        await queryRunner.query(`DROP TABLE "funcionarios"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "vendas"`);
        await queryRunner.query(`DROP TABLE "enderecos"`);
    }

}
