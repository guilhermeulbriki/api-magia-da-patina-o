import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

@injectable()
class DeleteStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new AppError('Aluno não encontrado');
    }

    await this.studentRepository.delete(id);
  }
}

export default DeleteStudentService;
