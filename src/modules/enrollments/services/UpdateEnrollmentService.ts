import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../infra/typeorm/entities/Enrollments';

@injectable()
class UpdateEnrollmentService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,
  ) {}

  public async execute(student_id: string): Promise<Enrollment> {
    const findedEnrollment = await this.enrollmentsRepository.findByStudentId(
      student_id,
    );

    if (!findedEnrollment) {
      throw new AppError('Este aluno não esta matriculado');
    }

    const currentDate = new Date(Date.now());

    findedEnrollment.updated_at = currentDate;

    return this.enrollmentsRepository.save(findedEnrollment);
  }
}

export default UpdateEnrollmentService;
