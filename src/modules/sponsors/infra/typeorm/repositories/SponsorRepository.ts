import { getRepository, Repository } from 'typeorm';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import ICreateSponsorDTO from '@modules/sponsors/dtos/ICreateSponsorDTO';

import Sponsor from '../entities/Sponsors';

class SponsorRepository implements ISponsorRepository {
  private ormRepository: Repository<Sponsor>;

  constructor() {
    this.ormRepository = getRepository(Sponsor);
  }

  public async create(sponsorData: ICreateSponsorDTO): Promise<Sponsor> {
    const appointment = this.ormRepository.create(sponsorData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(sponsor: Sponsor): Promise<Sponsor> {
    return this.ormRepository.save(sponsor);
  }

  public async findByEmail(email: string): Promise<Sponsor | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findByCpf(cpf: string): Promise<Sponsor | undefined> {
    return this.ormRepository.findOne({
      where: { cpf },
    });
  }

  public async findByRg(rg: string): Promise<Sponsor | undefined> {
    return this.ormRepository.findOne({
      where: { rg },
    });
  }
}

export default SponsorRepository;
