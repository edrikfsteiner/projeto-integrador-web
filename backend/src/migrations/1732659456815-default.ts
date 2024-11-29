import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732659456815 implements MigrationInterface {
    name = 'Default1732659456815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "nome" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "celular" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "cargo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "salario" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionarios" ADD "data_contratacao" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "data_contratacao"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "salario"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cargo"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "funcionarios" DROP COLUMN "nome"`);
    }

}
