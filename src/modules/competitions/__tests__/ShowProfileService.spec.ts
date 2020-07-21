import AppError from '@shared/errors/AppError';

import ShowScheduleService from '../services/ShowScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeSchedulesRepository: FakeScheduleRepository;
let showSchedule: ShowScheduleService;

describe('ShowSchedule', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeScheduleRepository();

    showSchedule = new ShowScheduleService(fakeSchedulesRepository);
  });

  it('should be able to show a schedule', async () => {
    const schedule = await fakeSchedulesRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: '123',
      shift: '8:30',
      start: '9:30',
    });

    expect(await showSchedule.execute(schedule.id)).toEqual(schedule);
  });

  it('should not be able to get a student with wrong id', async () => {
    await expect(showSchedule.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
