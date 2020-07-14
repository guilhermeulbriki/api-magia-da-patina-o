import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

@injectable()
class ListGroupsService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(city: string): Promise<Group[] | undefined> {
    let groups = await this.groupsRepository.list();

    if (city.length > 1) {
      groups = groups.filter(group => group.city === city);
    }

    return groups;
  }
}

export default ListGroupsService;
