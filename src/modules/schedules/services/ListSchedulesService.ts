import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

import Schedule from '../infra/typeorm/entities/Schedule';

@injectable()
class ListSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(): Promise<Schedule[]> {
    return this.schedulesRepository.list();
  }
}

export default ListSchedulesService;
