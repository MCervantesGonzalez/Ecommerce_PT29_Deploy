import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class MigrationTest1762219268970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash('aaBB11##', 10);

    await queryRunner.query(
      `
				INSERT INTO "USERS" ("name", "email", "password", "phone", "country", "city", "address", "isAdmin", "isTester", "isDeleted") 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			`,
      [
        'TestUser',
        'testuser@mail.com',
        passwordHash,
        222333,
        'testCountry',
        'testCity',
        'testAddress',
        true,
        false,
        false,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "USERS" WHERE "email" = $1`, [
      'testuser@mail.com',
    ]);
  }
}
