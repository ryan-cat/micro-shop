import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductImage1609727197608 implements MigrationInterface {
  name = 'ProductImage1609727197608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "imageUrl" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "imageUrl"`);
  }
}
