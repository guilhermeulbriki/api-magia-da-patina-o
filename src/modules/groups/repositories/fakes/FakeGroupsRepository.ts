import { uuid } from 'uuidv4';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import ICreateGroupsDTO from '@modules/groups/dtos/ICreateGroupsDTO';
import IFindByCityAndColor from '@modules/groups/dtos/IFindByCityAndColor';

import Group from '../../infra/typeorm/entities/Groups';

class FakeGroupsRepository implements IGroupsRepository {
  private groups: Group[] = [];

  public async list(): Promise<Group[]> {
    return this.groups;
  }

  public async create(groupData: ICreateGroupsDTO): Promise<Group> {
    const group = new Group();

    Object.assign(group, { id: uuid() }, groupData);

    this.groups.push(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    const findIndex = this.groups.findIndex(
      findGrounp => findGrounp.id === group.id,
    );

    this.groups[findIndex] = group;

    return group;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.groups.findIndex(group => group.id === id);

    this.groups.splice(findIndex, 1);
  }

  public async findById(id: string): Promise<Group | undefined> {
    const findedGroup = this.groups.find(group => group.id === id);

    return findedGroup;
  }

  public async findByCity(city: string): Promise<Group[] | undefined> {
    const findedGroup = this.groups.filter(group => group.city !== city);

    return findedGroup;
  }

  public async findByCityAndColor({
    city,
    color,
  }: IFindByCityAndColor): Promise<Group | undefined> {
    const findedGroup = this.groups.find(
      group => group.city === city && group.color === color,
    );

    return findedGroup;
  }
}

export default FakeGroupsRepository;
