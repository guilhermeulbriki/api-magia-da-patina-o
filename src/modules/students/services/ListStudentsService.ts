import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import formatValueToFilter from '@shared/utils/formatValueToFilter';
import Student from '../infra/typeorm/entities/Students';

interface IRequestDTO {
  name: string;
  sponsor_name: string;
  age: number | undefined;
  group: string | undefined;
  skip: number;
}

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Student[] | undefined> {
    const page = (data.skip - 1) * 20;
    let students = await this.studentRepository.list(page);

    if (data.name !== undefined && data.name.length > 1) {
      students = students.filter(
        student =>
          formatValueToFilter(student.name).indexOf(
            formatValueToFilter(data.name),
          ) > -1,
      );
    }

    if (data.sponsor_name !== undefined && data.sponsor_name.length > 1) {
      students = students.filter(
        student =>
          formatValueToFilter(student.sponsor.name).indexOf(
            formatValueToFilter(data.sponsor_name),
          ) > -1,
      );
    }

    if (data.age !== undefined && data.age > 0) {
      students = students.filter(student => student.age === data.age);
    }

    if (data.group !== undefined && data.group.length > 1) {
      students = students.filter(
        student =>
          formatValueToFilter(student.group.color) ===
          formatValueToFilter(data.group),
      );
    }

    return students;
  }
}

export default ListStudentsService;
