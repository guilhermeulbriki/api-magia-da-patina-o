import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

@injectable()
class DeleteEnrollmentService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    console.log(id);
    const enrollment = await this.enrollmentsRepository.findByStudentId(id);

    if (!enrollment) {
      throw new AppError('Matrícula não encontrada');
    }

    await this.enrollmentsRepository.delete(id);
  }
}

export default DeleteEnrollmentService;
