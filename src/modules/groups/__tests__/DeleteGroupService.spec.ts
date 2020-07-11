import AppError from '@shared/errors/AppError';
import DeleteGroupService from '../services/DeleteGroupService';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;
let deleteGroup: DeleteGroupService;

describe('DeleteGroup', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();

    deleteGroup = new DeleteGroupService(fakeGroupsRepository);
  });

  it('should be able to delete a sponsor', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'branca',
      city: 'fw',
      color: 'branca',
      instructor: 'julia',
    });

    await deleteGroup.execute(group.id);

    const groups = await fakeGroupsRepository.list();

    expect(groups).toEqual([]);
  });

  it('should not be able to delete a sponsor if does not exist', async () => {
    await expect(deleteGroup.execute('123')).rejects.toBeInstanceOf(AppError);
  });
});
