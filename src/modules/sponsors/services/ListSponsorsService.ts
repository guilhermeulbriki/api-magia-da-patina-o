import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import Sponsors from '../infra/typeorm/entities/Sponsors';

@injectable()
class ListSponsorsService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(): Promise<Sponsors[]> {
    return this.sponsorRepository.listAll();
  }
}

export default ListSponsorsService;
