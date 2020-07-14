import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../infra/typeorm/entities/Enrollments';

@injectable()
class CreateEnrollmentService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,
  ) {}

  public async execute(student_id: string): Promise<Enrollment> {
    const enrollment = await this.enrollmentsRepository.create(student_id);

    return enrollment;
  }
}

export default CreateEnrollmentService;
