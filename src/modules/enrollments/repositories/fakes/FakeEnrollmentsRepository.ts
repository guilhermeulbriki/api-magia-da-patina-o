import { uuid } from 'uuidv4';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../../infra/typeorm/entities/Enrollments';

class FakeEnrollmentsRepository implements IEnrollmentsRepository {
  private enrollments: Enrollment[] = [];

  public async list(): Promise<Enrollment[]> {
    return this.enrollments;
  }

  public async create(student_id: string): Promise<Enrollment> {
    const enrollment = new Enrollment();

    Object.assign(enrollment, { id: uuid() }, student_id);

    this.enrollments.push(enrollment);

    return enrollment;
  }

  public async save(enrollment: Enrollment): Promise<Enrollment> {
    const findIndex = this.enrollments.findIndex(
      findEnrollment => findEnrollment.id === enrollment.id,
    );

    this.enrollments[findIndex] = enrollment;

    return enrollment;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.enrollments.findIndex(
      enrollment => enrollment.id === id,
    );

    this.enrollments.splice(findIndex, 1);
  }

  public async findById(id: string): Promise<Enrollment | undefined> {
    const findedEnrollment = this.enrollments.find(
      enrollment => enrollment.id === id,
    );

    return findedEnrollment;
  }
}

export default FakeEnrollmentsRepository;
