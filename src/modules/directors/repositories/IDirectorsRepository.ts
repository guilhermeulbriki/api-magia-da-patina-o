import Director from '../infra/typeorm/entities/Director';
import ICreateDirectorDTO from '../dtos/ICreateDirectorDTO';

export default interface IDirectorsRepository {
  list(): Promise<Director[]>;
  create(data: ICreateDirectorDTO): Promise<Director>;
  save(director: Director): Promise<Director>;
  findById(name: string): Promise<Director | undefined>;
  delete(id: string): Promise<void>;
}
