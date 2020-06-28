import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import Sponsor from '../infra/typeorm/entities/Sponsors';

@injectable()
class FindByIdService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(id: string): Promise<Sponsor | undefined> {
    const sponsor = await this.sponsorRepository.findById(id);

    if (!sponsor) {
      throw new AppError('Responsável não encontrado');
    }

    return sponsor;
  }
}

export default FindByIdService;
