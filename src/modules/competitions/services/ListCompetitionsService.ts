import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

import Competition from '../infra/typeorm/entities/Competition';

interface IRequestDTO {
  award: string;
  skip: number;
}

@injectable()
class ListCompetitionsService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute({ award, skip }: IRequestDTO): Promise<Competition[]> {
    const page = (skip - 1) * 3;
    let competitions = await this.competitionRepository.list(page);

    if (award !== undefined && !isNaN(parseInt(award))) {
      competitions = competitions.filter(
        competition => competition.award === parseInt(award),
      );
    }

    return competitions;
  }
}

export default ListCompetitionsService;
