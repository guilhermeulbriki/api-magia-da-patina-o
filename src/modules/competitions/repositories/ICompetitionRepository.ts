import Competition from '../infra/typeorm/entities/Competition';
import ICreateCompetitionDTO from '../dtos/ICreateCompetitionDTO';

export default interface ICompetitionRepository {
  list(page: number): Promise<Competition[]>;
  create(data: ICreateCompetitionDTO): Promise<Competition>;
  save(competition: Competition): Promise<Competition>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Competition | undefined>;
}
