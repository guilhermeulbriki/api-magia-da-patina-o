import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../infra/typeorm/entities/Enrollments';

@injectable()
class ListEnrollmentsService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,
  ) {}

  public async execute(): Promise<Enrollment[] | undefined> {
    const enrollments = await this.enrollmentsRepository.list();

    return enrollments;
  }
}

export default ListEnrollmentsService;
