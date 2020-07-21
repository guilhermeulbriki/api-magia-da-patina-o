import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

@injectable()
class ShowCompetitionService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute(id: string): Promise<Competition | undefined> {
    const competition = await this.competitionRepository.findById(id);

    if (!competition) {
      throw new AppError('Horário não encontrado');
    }

    return competition;
  }
}

export default ShowCompetitionService;
