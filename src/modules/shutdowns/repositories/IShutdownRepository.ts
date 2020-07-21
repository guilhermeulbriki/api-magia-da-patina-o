import Shutdown from '../infra/typeorm/entities/Shutdown';
import ICreateShutdownDTO from '../dtos/ICreateShutdownDTO';

export default interface IShutdownRepository {
  list(): Promise<Shutdown[]>;
  create(data: ICreateShutdownDTO): Promise<Shutdown>;
  save(shutdown: Shutdown): Promise<Shutdown>;
  findBySponsorName(name: string): Promise<Shutdown | undefined>;
}
