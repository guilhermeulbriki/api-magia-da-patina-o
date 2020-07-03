import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddGroupIdInStudents1593727465487
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'group');
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'StudentGroup',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('groups', 'StudentGroup');
    await queryRunner.dropColumn('groups', 'group_id');
    await queryRunner.addColumn(
      'groups',
      new TableColumn({
        name: 'group',
        type: 'varchar',
      }),
    );
  }
}
