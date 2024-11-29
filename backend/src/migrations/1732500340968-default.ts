import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732500340968 implements MigrationInterface {
    name = 'Default1732500340968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "preco"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "enderecosId" uuid`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "clientesId" uuid`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD "funcionariosId" uuid`);
        await queryRunner.query(`ALTER TABLE "intens_compras" ADD "comprasId" uuid`);
        await queryRunner.query(`ALTER TABLE "intens_compras" ADD "produtosId" uuid`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "vendasId" uuid`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "produtosId" uuid`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD CONSTRAINT "FK_ac29fe00ee88ac445a3ccadfa64" FOREIGN KEY ("enderecosId") REFERENCES "enderecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_cb7fa3ed1822a48ffad592abe2f" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_d3c3abb4e8df968ba1a4002bbbe" FOREIGN KEY ("funcionariosId") REFERENCES "funcionarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intens_compras" ADD CONSTRAINT "FK_d5ff1791542f3d146dcb31a3e64" FOREIGN KEY ("comprasId") REFERENCES "compras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intens_compras" ADD CONSTRAINT "FK_78d3055a0a959fe08313de09ead" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD CONSTRAINT "FK_acf8254ce5da66d14c86582534d" FOREIGN KEY ("vendasId") REFERENCES "vendas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD CONSTRAINT "FK_dbd047f526259422f4eba696ef2" FOREIGN KEY ("produtosId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP CONSTRAINT "FK_dbd047f526259422f4eba696ef2"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP CONSTRAINT "FK_acf8254ce5da66d14c86582534d"`);
        await queryRunner.query(`ALTER TABLE "intens_compras" DROP CONSTRAINT "FK_78d3055a0a959fe08313de09ead"`);
        await queryRunner.query(`ALTER TABLE "intens_compras" DROP CONSTRAINT "FK_d5ff1791542f3d146dcb31a3e64"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_d3c3abb4e8df968ba1a4002bbbe"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_cb7fa3ed1822a48ffad592abe2f"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP CONSTRAINT "FK_ac29fe00ee88ac445a3ccadfa64"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "produtosId"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" DROP COLUMN "vendasId"`);
        await queryRunner.query(`ALTER TABLE "intens_compras" DROP COLUMN "produtosId"`);
        await queryRunner.query(`ALTER TABLE "intens_compras" DROP COLUMN "comprasId"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "funcionariosId"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP COLUMN "clientesId"`);
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "enderecosId"`);
        await queryRunner.query(`ALTER TABLE "intens_vendas" ADD "preco" numeric NOT NULL`);
    }

}
