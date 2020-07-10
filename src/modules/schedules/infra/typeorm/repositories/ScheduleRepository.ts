import { getRepository, Repository } from 'typeorm';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

import Schedule from '../entities/Schedule';

class ScheduleRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async list(): Promise<Schedule[]> {
    return this.ormRepository.find({
      relations: ['group'],
      order: { created_at: 'DESC' },
    });
  }

  public async create(scheduleData: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await this.ormRepository.create(scheduleData);

    await this.ormRepository.save(schedule);

    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    return this.ormRepository.save(schedule);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findById(id: string): Promise<Schedule | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['group'],
    });
  }
}

export default ScheduleRepository;
