import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

interface IRequestDTO {
  id: string;
  name: string;
  award: 1 | 2 | 3 | 4 | 5;
  category: string;
  city: string;
  date: Date;
  student_name: string;
}

@injectable()
class UpdateCompetitionService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Competition> {
    const competition = await this.competitionRepository.findById(data.id);

    if (!competition) {
      throw new AppError('Competição não encontrada');
    }

    competition.name = data.name;
    competition.award = data.award;
    competition.category = data.category;
    competition.city = data.city;
    competition.date = data.date;

    return this.competitionRepository.save(competition);
  }
}

export default UpdateCompetitionService;
