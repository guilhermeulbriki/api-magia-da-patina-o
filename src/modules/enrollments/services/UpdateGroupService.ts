import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

interface IRequestDTO {
  id: string;
  city: string;
  color: string;
  name: string;
  instructor: string;
}

@injectable()
class UpdateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute({
    city,
    instructor,
    color,
    name,
    id,
  }: IRequestDTO): Promise<Group> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    const checkExistGroup = await this.groupsRepository.findByCityAndName({
      city,
      name,
    });

    if (checkExistGroup) {
      if (group.city !== city || group.name !== name) {
        throw new AppError(
          'Ops, já existe uma turma com este nome na sua cidade',
        );
      }
    }

    group.city = city;
    group.name = name;
    group.color = color;
    group.instructor = instructor;

    return this.groupsRepository.save(group);
  }
}

export default UpdateGroupService;
