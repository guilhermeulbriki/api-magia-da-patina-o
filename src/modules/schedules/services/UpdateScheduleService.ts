import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Schedule from '../infra/typeorm/entities/Schedule';

interface IRequestDTO {
  id: string;
  shift: string;
  day: string;
  start: string;
  finish: string;
  group_id: string;
}

@injectable()
class UpdateStudantService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Schedule> {
    const schedule = await this.schedulesRepository.findById(data.id);

    if (!schedule) {
      throw new AppError('Horário não encontrado');
    }

    const group = await this.groupsRepository.findById(data.group_id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    schedule.shift = data.shift;
    schedule.day = data.day;
    schedule.start = data.start;
    schedule.finish = data.finish;
    schedule.group = group;

    return this.schedulesRepository.save(schedule);
  }
}

export default UpdateStudantService;
