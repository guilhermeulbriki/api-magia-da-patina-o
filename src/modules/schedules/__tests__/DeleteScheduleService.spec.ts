import AppError from '@shared/errors/AppError';
import DeleteScheduleService from '../services/DeleteScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let deleteSchedule: DeleteScheduleService;

describe('DeleteSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();

    deleteSchedule = new DeleteScheduleService(fakeScheduleRepository);
  });

  it('should be able to delete a schedule', async () => {
    const schedule = await fakeScheduleRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: '123',
      shift: 'manha',
      start: '7:30',
    });

    await deleteSchedule.execute(schedule.id);

    const schedules = await fakeScheduleRepository.list();

    expect(schedules).toEqual([]);
  });

  it('should not be able to delete a schedule if does not exist', async () => {
    await expect(deleteSchedule.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
