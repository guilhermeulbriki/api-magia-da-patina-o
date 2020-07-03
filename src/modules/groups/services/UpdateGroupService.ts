import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Group from '../infra/typeorm/entities/Groups';

interface IRequestDTO {
  id: string;
  city: string;
  color: string;
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
    id,
  }: IRequestDTO): Promise<Group> {
    const group = await this.groupsRepository.findById(id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    const checkExistGroup = await this.groupsRepository.findByCityAndColor({
      city,
      color,
    });

    if (checkExistGroup) {
      if (group.city !== city || group.color !== color) {
        throw new AppError(
          'Ops, já existe uma turma com está cor na sua cidade',
        );
      }
    }

    group.city = city;
    group.color = color;
    group.instructor = instructor;

    return this.groupsRepository.save(group);
  }
}

export default UpdateGroupService;
