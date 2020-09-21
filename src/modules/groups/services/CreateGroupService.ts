import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

interface IRequestDTO {
  name: string;
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
    name,
  }: IRequestDTO): Promise<Group> {
    const checkExistGroup = await this.groupsRepository.findByCityAndName({
      city,
      name,
    });

    if (checkExistGroup) {
      throw new AppError(
        'Ops, já existe uma turma com este nome na sua cidade',
      );
    }

    const group = await this.groupsRepository.create({
      name,
      city,
      color,
      instructor,
    });

    const findedGroup = await this.groupsRepository.findById(group.id);

    if (findedGroup) return findedGroup;

    return group;
  }
}

export default CreateGroupService;
