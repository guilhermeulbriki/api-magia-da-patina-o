import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isBefore, isAfter, getYear } from 'date-fns';

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
    const startSeasion = new Date(getYear(currentDate), 6, 15);
    const endSeasion = new Date(getYear(currentDate), 6, 20);

    if (
      isBefore(currentDate, startSeasion) ||
      isAfter(currentDate, endSeasion)
    ) {
      throw new AppError('Fora do período de rematrículas');
    }

    const updatedEnrollment = {
      ...findedEnrollment,
      updated_at: currentDate,
    };

    return this.enrollmentsRepository.save(updatedEnrollment);
  }
}

export default UpdateEnrollmentService;
