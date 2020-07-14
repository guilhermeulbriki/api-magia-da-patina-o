import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

@injectable()
class ShowGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(id: string): Promise<Group> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    return group;
  }
}

export default ShowGroupService;
