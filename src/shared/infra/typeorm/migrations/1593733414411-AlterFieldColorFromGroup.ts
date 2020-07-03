import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterFieldColorFromGroup1593733414411
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'groups',
      'color',
      new TableColumn({
        name: 'color',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'groups',
      'color',
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
