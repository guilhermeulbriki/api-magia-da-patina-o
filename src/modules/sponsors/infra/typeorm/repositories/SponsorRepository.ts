import { getRepository, Repository } from 'typeorm';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import ICreateSponsorDTO from '@modules/sponsors/dtos/ICreateSponsorDTO';

import Sponsor from '../entities/Sponsors';

class SponsorRepository implements ISponsorRepository {
  private ormRepository: Repository<Sponsor>;

  constructor() {
    this.ormRepository = getRepository(Sponsor);
  }

  public async listAll(skip: number): Promise<Sponsor[]> {
    return this.ormRepository.find({
      skip,
      take: 20,
    });
  }

  public async create(sponsorData: ICreateSponsorDTO): Promise<Sponsor> {
    const sponsor = await this.ormRepository.create(sponsorData);

    await this.ormRepository.save(sponsor);

    return sponsor;
  }

  public async save(sponsor: Sponsor): Promise<Sponsor> {
    return this.ormRepository.save(sponsor);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
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

  public async findById(id: string): Promise<Sponsor | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByName(name: string): Promise<Sponsor | undefined> {
    return this.ormRepository.findOne({
      where: { name },
    });
  }
}

export default SponsorRepository;
