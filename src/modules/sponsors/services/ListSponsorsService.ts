import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import Sponsors from '../infra/typeorm/entities/Sponsors';

interface IRequestDTO {
  name: string;
  skip: number;
}

@injectable()
class ListSponsorsService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Sponsors[]> {
    const page = (data.skip - 1) * 3;

    let sponsors = await this.sponsorRepository.listAll(page);

    if (data.name !== undefined && data.name.length > 1) {
      sponsors = sponsors.filter(sponsor => !sponsor.name.indexOf(data.name));
    }

    return sponsors;
  }
}

export default ListSponsorsService;
