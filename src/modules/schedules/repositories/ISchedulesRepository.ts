import Schedule from '../infra/typeorm/entities/Schedule';
import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';

export default interface IScheduleRepository {
  list(): Promise<Schedule[]>;
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  save(schedule: Schedule): Promise<Schedule>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Schedule | undefined>;
}
