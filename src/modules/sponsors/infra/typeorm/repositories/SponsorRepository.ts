import { getRepository, Repository, DeleteResult } from 'typeorm';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import ICreateSponsorDTO from '@modules/sponsors/dtos/ICreateSponsorDTO';

import Sponsor from '../entities/Sponsors';

class SponsorRepository implements ISponsorRepository {
  private ormRepository: Repository<Sponsor>;

  constructor() {
    this.ormRepository = getRepository(Sponsor);
  }

  public async listAll(): Promise<Sponsor[]> {
    return this.ormRepository.find();
  }

  public async create(sponsorData: ICreateSponsorDTO): Promise<Sponsor> {
    const appointment = await this.ormRepository.create(sponsorData);

    await this.ormRepository.save(appointment);

    return appointment;
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
}

export default SponsorRepository;
