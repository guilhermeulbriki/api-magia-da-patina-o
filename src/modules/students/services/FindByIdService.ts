import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Students';

@injectable()
class FindByIdService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(id: string): Promise<Student | undefined> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new AppError('Aluno não encontrado');
    }

    return student;
  }
}

export default FindByIdService;
