import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Schedule from '../infra/typeorm/entities/Schedule';

interface IRequestDTO {
  shift: string;
  day: string;
  start: string;
  finish: string;
  group_id: string;
}

@injectable()
class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Schedule> {
    const checkGroupExist = await this.groupsRepository.findById(data.group_id);

    if (!checkGroupExist) {
      throw new AppError('Turma não encontrada');
    }

    return this.schedulesRepository.create(data);
  }
}

export default CreateScheduleService;
