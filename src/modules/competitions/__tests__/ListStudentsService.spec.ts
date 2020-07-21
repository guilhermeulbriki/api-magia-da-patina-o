import ListSchedulesService from '../services/ListSchedulesService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeSchedulesRepository: FakeScheduleRepository;

let listSchedules: ListSchedulesService;

describe('ListScheduless', () => {
  beforeEach(() => {
    fakeSchedulesRepository = new FakeScheduleRepository();

    listSchedules = new ListSchedulesService(fakeSchedulesRepository);
  });

  it('should be able to list all schedules', async () => {
    const schedule1 = await fakeSchedulesRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: '123',
      shift: '8:30',
      start: '9:30',
    });

    const schedule2 = await fakeSchedulesRepository.create({
      day: 'segunda1',
      finish: '8:301',
      group_id: '1231',
      shift: '8:301',
      start: '9:301',
    });

    const schedules = await listSchedules.execute();

    expect(schedules).toEqual([schedule1, schedule2]);
  });
});
