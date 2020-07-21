import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

@injectable()
class ListCompetitionsService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute(): Promise<Competition[]> {
    return this.competitionRepository.list();
  }
}

export default ListCompetitionsService;
