import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

@injectable()
class DeleteSponsorService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const sponsor = await this.sponsorRepository.findById(id);

    if (!sponsor) {
      throw new AppError('Responsável não encontrado');
    }

    await this.sponsorRepository.delete(id);
  }
}

export default DeleteSponsorService;
