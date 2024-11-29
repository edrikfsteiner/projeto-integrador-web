import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732586584981 implements MigrationInterface {
    name = 'Default1732586584981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cargo"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "data_contratacao"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "usuario" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "senha" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "usuario"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "data_contratacao" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "salario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cargo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "celular" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "nome" character varying NOT NULL`);
    }

}
