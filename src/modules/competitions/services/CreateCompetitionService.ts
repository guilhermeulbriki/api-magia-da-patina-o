import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

interface IRequestDTO {
  name: string;
  award: 1 | 2 | 3 | 4 | 5;
  category: string;
  city: string;
  date: Date;
  student_name: string;
}

@injectable()
class CreateCompetitionsService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Competition> {
    return this.competitionRepository.create(data);
  }
}

export default CreateCompetitionsService;
