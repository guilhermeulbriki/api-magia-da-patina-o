import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Students';

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(): Promise<Student[]> {
    return this.studentRepository.list();
  }
}

export default ListStudentsService;
