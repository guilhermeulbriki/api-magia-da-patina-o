import { getRepository, Repository } from 'typeorm';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';

import Enrollment from '../entities/Enrollments';

class EnrollmentsRepository implements IEnrollmentsRepository {
  private ormRepository: Repository<Enrollment>;

  constructor() {
    this.ormRepository = getRepository(Enrollment);
  }

  public async list(): Promise<Enrollment[]> {
    return this.ormRepository.find();
  }

  public async create(student_id: string): Promise<Enrollment> {
    const enrollment = await this.ormRepository.create({
      student_id,
    });

    await this.ormRepository.save(enrollment);

    return enrollment;
  }

  public async save(enrollment: Enrollment): Promise<Enrollment> {
    return this.ormRepository.save(enrollment);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findById(id: string): Promise<Enrollment | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['student'],
    });
  }
}

export default EnrollmentsRepository;
