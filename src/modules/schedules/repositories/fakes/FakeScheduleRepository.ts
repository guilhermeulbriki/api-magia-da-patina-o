import { uuid } from 'uuidv4';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';

import Schedule from '../../infra/typeorm/entities/Schedule';

class FakeSchedulesRepository implements ISchedulesRepository {
  private schedules: Schedule[] = [];

  public async findById(id: string): Promise<Schedule | undefined> {
    const findSponsorById = this.schedules.find(schedule => schedule.id === id);

    return findSponsorById;
  }

  public async list(): Promise<Schedule[]> {
    return this.schedules;
  }

  public async create(scheduleData: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = new Schedule();

    Object.assign(schedule, { id: uuid() }, scheduleData);

    this.schedules.push(schedule);

    return schedule;
  }

  public async save(schedule: Schedule): Promise<Schedule> {
    const findIndex = this.schedules.findIndex(
      findSchedule => findSchedule.id === schedule.id,
    );

    this.schedules[findIndex] = schedule;

    return schedule;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.schedules.findIndex(schedule => schedule.id === id);

    this.schedules.splice(findIndex, 1);
  }
}

export default FakeSchedulesRepository;
