import Groups from '../infra/typeorm/entities/Groups';
import ICreateGroupsDTO from '../dtos/ICreateGroupsDTO';
import IFindByCityAndColor from '../dtos/IFindByCityAndColor';

export default interface IGroupsRepository {
  list(): Promise<Groups[]>;
  create(data: ICreateGroupsDTO): Promise<Groups>;
  save(group: Groups): Promise<Groups>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Groups | undefined>;
  findByCityAndColor(data: IFindByCityAndColor): Promise<Groups | undefined>;
  findByCity(city: string): Promise<Groups[] | undefined>;
}
