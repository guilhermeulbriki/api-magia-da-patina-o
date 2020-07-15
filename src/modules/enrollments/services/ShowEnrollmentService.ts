import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../infra/typeorm/entities/Enrollments';

@injectable()
class ShowEnrollmentService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,
  ) {}

  public async execute(id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.findById(id);

    if (!enrollment) {
      throw new AppError('Matrícula não encontrada');
    }

    return enrollment;
  }
}

export default ShowEnrollmentService;
