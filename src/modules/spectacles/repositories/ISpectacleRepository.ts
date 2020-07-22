import Spectacle from '../infra/typeorm/entities/Spectacle';
import ICreateSpectacleDTO from '../dtos/ICreateSpectacleDTO';
import IListOrderDTO from '../dtos/IListOrderDTO';

export default interface ISpectacleRepository {
  list(data: IListOrderDTO): Promise<Spectacle[]>;
  create(data: ICreateSpectacleDTO): Promise<Spectacle>;
  save(spectacle: Spectacle): Promise<Spectacle>;
  findById(name: string): Promise<Spectacle | undefined>;
  delete(id: string): Promise<void>;
}
