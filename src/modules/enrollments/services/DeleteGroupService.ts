import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

@injectable()
class DeleteGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    await this.groupsRepository.delete(id);
  }
}

export default DeleteGroupService;
