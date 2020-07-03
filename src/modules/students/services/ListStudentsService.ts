import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Students';

interface IRequestDTO {
  name: string;
  age: number | undefined;
  group: string | undefined;
}

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Student[] | undefined> {
    let students = await this.studentRepository.list();

    if (data.name !== undefined && data.name.length > 1) {
      students = students.filter(student => !student.name.indexOf(data.name));
    }

    if (data.age !== undefined && data.age > 0) {
      students = students.filter(student => student.age === data.age);
    }

    if (data.group !== undefined && data.group.length > 1) {
      students = students.filter(student => student.group.color === data.group);
    }

    return students;
  }
}

export default ListStudentsService;
