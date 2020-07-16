import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import UpdateScheduleService from '../services/UpdateScheduleService';
import FakeScheduleRepository from '../repositories/fakes/FakeScheduleRepository';

let fakeScheduleRepository: FakeScheduleRepository;
let fakeGroupsRepository: FakeGroupsRepository;

let updateSchedule: UpdateScheduleService;

describe('UpdateSchedule', () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeScheduleRepository();
    fakeGroupsRepository = new FakeGroupsRepository();

    updateSchedule = new UpdateScheduleService(
      fakeScheduleRepository,
      fakeGroupsRepository,
    );
  });

  it('should be able to update the schedule', async () => {
    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'gui',
      name: 'branca',
    });

    const schedule = await fakeScheduleRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: group.id,
      shift: '8:30',
      start: '9:30',
    });

    const updatedSchedule = await updateSchedule.execute({
      id: schedule.id,
      day: 'terça',
      finish: '8:30',
      group_id: group.id,
      shift: '8:30',
      start: '9:30',
    });

    expect(updatedSchedule.day).toBe('terça');
  });

  it('should not be able to update a schedule if does not exist', async () => {
    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'gui',
      name: 'branca',
    });

    await fakeScheduleRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: group.id,
      shift: '8:30',
      start: '9:30',
    });

    await expect(
      updateSchedule.execute({
        id: 'WRONG-ID',
        day: 'terça',
        finish: '8:30',
        group_id: group.id,
        shift: '8:30',
        start: '9:30',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a schedule if group does not exist', async () => {
    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'gui',
      name: 'branca',
    });

    const schedule = await fakeScheduleRepository.create({
      day: 'segunda',
      finish: '8:30',
      group_id: group.id,
      shift: '8:30',
      start: '9:30',
    });

    await expect(
      updateSchedule.execute({
        id: schedule.id,
        day: 'terça',
        finish: '8:30',
        group_id: 'WRONG-ID',
        shift: '8:30',
        start: '9:30',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
