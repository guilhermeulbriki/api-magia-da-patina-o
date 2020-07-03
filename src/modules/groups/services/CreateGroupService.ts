import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

interface IRequestDTO {
  city: string;
  color: string;
  instructor: string;
}

@injectable()
class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    city,
    color,
    instructor,
  }: IRequestDTO): Promise<Group> {
    const checkExistGroup = await this.groupsRepository.findByCityAndColor({
      city,
      color,
    });

    if (checkExistGroup) {
      throw new AppError('Ops, já existe uma turma com está cor na sua cidade');
    }

    return this.groupsRepository.create({
      city,
      color,
      instructor,
    });
  }
}

export default CreateGroupService;
