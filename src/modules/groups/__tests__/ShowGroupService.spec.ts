import AppError from '@shared/errors/AppError';

import ShowGroupService from '../services/ShowGroupService';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;
let showGroups: ShowGroupService;

describe('ShowGroup', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();

    showGroups = new ShowGroupService(fakeGroupsRepository);
  });

  it('should be able to get a group with id', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'branca',
      city: 'fw',
      color: 'branca',
      instructor: 'julia',
    });

    expect(await showGroups.execute(group.id)).toEqual(group);
  });

  it('should not be able to get a admin with wrong id', async () => {
    await expect(showGroups.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
