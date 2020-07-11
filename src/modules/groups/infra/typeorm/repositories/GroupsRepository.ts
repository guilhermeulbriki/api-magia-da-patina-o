import { getRepository, Repository } from 'typeorm';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import ICreateGroupsDTO from '@modules/groups/dtos/ICreateGroupsDTO';
import IFindByCityAndName from '@modules/groups/dtos/IFindByCityAndName';

import Group from '../entities/Groups';

class GroupRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async list(): Promise<Group[]> {
    return this.ormRepository.find();
  }

  public async create(groupData: ICreateGroupsDTO): Promise<Group> {
    const group = await this.ormRepository.create(groupData);

    await this.ormRepository.save(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findById(id: string): Promise<Group | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  public async findByCity(city: string): Promise<Group[] | undefined> {
    return this.ormRepository.find({
      where: { city },
    });
  }

  public async findByCityAndName({
    city,
    name,
  }: IFindByCityAndName): Promise<Group | undefined> {
    return this.ormRepository.findOne({
      where: { city, name },
    });
  }
}

export default GroupRepository;
