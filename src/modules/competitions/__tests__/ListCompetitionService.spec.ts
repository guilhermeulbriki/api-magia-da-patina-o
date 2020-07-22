import ListCompetitionsService from '../services/ListCompetitionsService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionRepository: FakeCompetitionRepository;

let listCompetitions: ListCompetitionsService;

describe('listCompetitions', () => {
  beforeEach(() => {
    fakeCompetitionRepository = new FakeCompetitionRepository();

    listCompetitions = new ListCompetitionsService(fakeCompetitionRepository);
  });

  it('should be able to list all competitions', async () => {
    const competition1 = await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    const competition2 = await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    const competitions = await listCompetitions.execute({
      award: '',
      skip: 1,
    });

    expect(competitions).toEqual([competition1, competition2]);
  });

  it('should be able to list only competitions with award like 2', async () => {
    await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    const competition = await fakeCompetitionRepository.create({
      award: 2,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    const competitions = await listCompetitions.execute({
      award: '2',
      skip: 1,
    });

    expect(competitions).toEqual([competition]);
  });
});
