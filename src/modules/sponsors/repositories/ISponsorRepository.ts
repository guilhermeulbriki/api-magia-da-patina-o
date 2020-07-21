import Sponsor from '../infra/typeorm/entities/Sponsors';
import ICreateSponsorDTO from '../dtos/ICreateSponsorDTO';

export default interface ISponsorRepository {
  listAll(): Promise<Sponsor[]>;
  create(data: ICreateSponsorDTO): Promise<Sponsor>;
  save(sponsor: Sponsor): Promise<Sponsor>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<Sponsor | undefined>;
  findByName(name: string): Promise<Sponsor | undefined>;
  findByCpf(cpf: string): Promise<Sponsor | undefined>;
  findByRg(rg: string): Promise<Sponsor | undefined>;
  findById(id: string): Promise<Sponsor | undefined>;
}
