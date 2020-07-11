import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

import Schedule from '../infra/typeorm/entities/Schedule';

@injectable()
class ShowScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(id: string): Promise<Schedule | undefined> {
    console.log(id);
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError('Horário não encontrado');
    }

    return schedule;
  }
}

export default ShowScheduleService;
