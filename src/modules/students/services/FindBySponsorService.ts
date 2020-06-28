import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import Student from '../infra/typeorm/entities/Students';

@injectable()
class FindBySponsorService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(sponsor_id: string): Promise<Student[]> {
    const checkId = await this.sponsorRepository.findById(sponsor_id);

    if (!checkId) {
      throw new AppError('Responsável não encontrado');
    }

    const findedStudents = await this.studentRepository.findBySponsor(
      sponsor_id,
    );

    return findedStudents;
  }
}

export default FindBySponsorService;
