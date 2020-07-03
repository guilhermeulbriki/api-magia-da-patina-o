import AppError from '@shared/errors/AppError';

import CreateGroupService from '../services/CreateGroupService';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;
let createGroup: CreateGroupService;

describe('CreateGroups', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();

    createGroup = new CreateGroupService(fakeGroupsRepository);
  });

  it('should be able to create a new group', async () => {
    const group = await createGroup.execute({
      city: 'Frederico Westphalen',
      color: 'branca',
      instructor: 'Julia Frizon',
    });

    expect(group).toHaveProperty('id');
    expect(group.color).toBe('branca');
  });

  it('should not be able to create a new group with same color and city', async () => {
    await createGroup.execute({
      city: 'fw',
      color: 'branca',
      instructor: 'Julia Frizon',
    });

    await expect(
      createGroup.execute({
        city: 'fw',
        color: 'branca',
        instructor: 'Julia Frizon',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
