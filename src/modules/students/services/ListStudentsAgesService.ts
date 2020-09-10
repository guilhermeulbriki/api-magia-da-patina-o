import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Students';

@injectable()
class ListStudentsAgesService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(): Promise<Student[]> {
    const students = await this.studentRepository.listAges();

    return students;
  }
}

export default ListStudentsAgesService;
