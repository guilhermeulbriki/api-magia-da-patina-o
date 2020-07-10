import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

@injectable()
class DeleteScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const schedule = await this.schedulesRepository.findById(id);

    if (!schedule) {
      throw new AppError('Horário não encontrado');
    }

    await this.schedulesRepository.delete(id);
  }
}

export default DeleteScheduleService;
