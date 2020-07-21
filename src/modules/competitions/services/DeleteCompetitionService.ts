import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';

@injectable()
class DeleteCompetitionService {
  constructor(
    @inject('CompetitionRepository')
    private competitionRepository: ICompetitionRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const competition = await this.competitionRepository.findById(id);

    if (!competition) {
      throw new AppError('Competição não encontrada');
    }

    await this.competitionRepository.delete(id);
  }
}

export default DeleteCompetitionService;
