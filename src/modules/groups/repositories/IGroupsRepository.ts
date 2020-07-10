import Groups from '../infra/typeorm/entities/Groups';
import ICreateGroupsDTO from '../dtos/ICreateGroupsDTO';
import IFindByCityAndName from '../dtos/IFindByCityAndName';

export default interface IGroupsRepository {
  list(): Promise<Groups[]>;
  create(data: ICreateGroupsDTO): Promise<Groups>;
  save(group: Groups): Promise<Groups>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Groups | undefined>;
  findByCityAndName(data: IFindByCityAndName): Promise<Groups | undefined>;
  findByCity(city: string): Promise<Groups[] | undefined>;
}
