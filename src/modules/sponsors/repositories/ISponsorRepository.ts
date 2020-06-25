import Sponsors from '../infra/typeorm/entities/Sponsors';
import ICreateSponsorDTO from '../dtos/ICreateSponsorDTO';

export default interface ISponsorRepository {
  create(data: ICreateSponsorDTO): Promise<Sponsors>;
  findByEmail(email: string): Promise<Sponsors | undefined>;
  findByCpf(cpf: string): Promise<Sponsors | undefined>;
  findByRg(rg: string): Promise<Sponsors | undefined>;
}
