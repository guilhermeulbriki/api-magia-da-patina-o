import { uuid } from 'uuidv4';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import ICreateSponsorDTO from '@modules/sponsors/dtos/ICreateSponsorDTO';

import Sponsors from '../../infra/typeorm/entities/Sponsors';

class FakeSponsorsRepository implements ISponsorRepository {
  private sponsors: Sponsors[] = [];

  public async findById(id: string): Promise<Sponsors | undefined> {
    const findSponsorById = this.sponsors.find(sponsor => sponsor.id === id);

    return findSponsorById;
  }

  public async listAll(): Promise<Sponsors[]> {
    return this.sponsors;
  }

  public async findByRg(rg: string): Promise<Sponsors | undefined> {
    const findSponsorByRg = this.sponsors.find(sponsor => sponsor.rg === rg);

    return findSponsorByRg;
  }

  public async findByCpf(cpf: string): Promise<Sponsors | undefined> {
    const findSponsorByCpf = this.sponsors.find(sponsor => sponsor.cpf === cpf);

    return findSponsorByCpf;
  }

  public async findByEmail(email: string): Promise<Sponsors | undefined> {
    const findSponsorByEmail = this.sponsors.find(
      sponsor => sponsor.email === email,
    );

    return findSponsorByEmail;
  }

  public async create(sponsorData: ICreateSponsorDTO): Promise<Sponsors> {
    const sponsor = new Sponsors();

    Object.assign(sponsor, { id: uuid() }, sponsorData);

    this.sponsors.push(sponsor);

    return sponsor;
  }

  public async save(sponsor: Sponsors): Promise<Sponsors> {
    const findIndex = this.sponsors.findIndex(
      findSponsor => findSponsor.id === sponsor.id,
    );

    this.sponsors[findIndex] = sponsor;

    return sponsor;
  }
}

export default FakeSponsorsRepository;
