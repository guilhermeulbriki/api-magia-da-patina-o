import ListCompetitionsService from '../services/ListCompetitionsService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionRepository: FakeCompetitionRepository;

let listCompetitions: ListCompetitionsService;

describe('listCompetitions', () => {
  beforeEach(() => {
    fakeCompetitionRepository = new FakeCompetitionRepository();

    listCompetitions = new ListCompetitionsService(fakeCompetitionRepository);
  });

  it('should be able to list all schedules', async () => {
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

    const competitions = await listCompetitions.execute();

    expect(competitions).toEqual([competition1, competition2]);
  });
});
