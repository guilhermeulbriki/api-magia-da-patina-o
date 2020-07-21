import AppError from '@shared/errors/AppError';

import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import CreateScheduleService from '../services/CreateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let fakeGroupsRepository: FakeGroupsRepository;

let createSchedule: CreateScheduleService;

describe('CreateSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();
    fakeGroupsRepository = new FakeGroupsRepository();

    createSchedule = new CreateScheduleService(
      fakeScheduleRepository,
      fakeGroupsRepository,
    );
  });

  it('should be able to create a new schedule', async () => {
    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'julia',
      name: 'branca',
    });

    const schedule = await createSchedule.execute({
      day: 'segunda',
      shift: 'manha',
      finish: '8',
      start: '9',
      group_id: group.id,
    });

    expect(schedule).toHaveProperty('id');
    expect(schedule.group_id).toBe(group.id);
  });

  it('should not be able to create a new schedule with a wrong group_id', async () => {
    await expect(
      createSchedule.execute({
        day: 'segunda',
        shift: 'manha',
        finish: '8',
        start: '9',
        group_id: 'WRONG-ID',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
