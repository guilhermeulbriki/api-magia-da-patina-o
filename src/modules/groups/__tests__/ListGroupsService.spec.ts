import ListGroupsService from '../services/ListGroupsService';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeGroupsRepository: FakeGroupsRepository;

let listGroups: ListGroupsService;

describe('ListGroups', () => {
  beforeEach(() => {
    fakeGroupsRepository = new FakeGroupsRepository();

    listGroups = new ListGroupsService(fakeGroupsRepository);
  });

  it('should be able to list all students', async () => {
    const group1 = await fakeGroupsRepository.create({
      name: 'branca',
      city: 'fw',
      color: 'branca',
      instructor: 'julia',
    });

    const group2 = await fakeGroupsRepository.create({
      name: 'azul',
      city: 'fw',
      color: 'azul',
      instructor: 'julia',
    });

    const groups = await listGroups.execute('');

    expect(groups).toEqual([group1, group2]);
  });

  it('should list only groups with city equal "fw"', async () => {
    const group1 = await fakeGroupsRepository.create({
      name: 'branca',
      city: 'fw',
      color: 'branca',
      instructor: 'julia',
    });

    await fakeGroupsRepository.create({
      name: 'azul',
      city: 'seberi',
      color: 'azul',
      instructor: 'julia',
    });

    const groups = await listGroups.execute('fw');

    expect(groups).toEqual([group1]);
  });
});
