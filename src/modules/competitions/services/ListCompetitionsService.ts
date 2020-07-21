import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

interface IRequestDTO {
  award: string;
}

@injectable()
class ListCompetitionsService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute({ award }: IRequestDTO): Promise<Competition[]> {
    let competitions = await this.competitionRepository.list();

    if (award !== undefined && !isNaN(parseInt(award))) {
      competitions = competitions.filter(
        competition => competition.award === parseInt(award),
      );
    }

    return competitions;
  }
}

export default ListCompetitionsService;
