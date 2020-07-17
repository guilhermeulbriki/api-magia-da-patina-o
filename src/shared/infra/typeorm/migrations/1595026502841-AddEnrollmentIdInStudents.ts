import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddEnrollmentIdInStudents1595026502841
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'enrollment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'students',
      new TableForeignKey({
        name: 'StudentEnrollment',
        columnNames: ['enrollment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enrollments',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('students', 'StudentEnrollment');
    await queryRunner.dropColumn('students', 'enrollment_id');
  }
}
