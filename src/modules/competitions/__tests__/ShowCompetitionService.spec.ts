import AppError from '@shared/errors/AppError';

import ShowCompetitionService from '../services/ShowCompetitionService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionsRepository: FakeCompetitionRepository;
let showCompetition: ShowCompetitionService;

describe('ShowCompetition', () => {
  beforeEach(() => {
    fakeCompetitionsRepository = new FakeCompetitionRepository();

    showCompetition = new ShowCompetitionService(fakeCompetitionsRepository);
  });

  it('should be able to show a competition', async () => {
    const competition = await fakeCompetitionsRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    expect(await showCompetition.execute(competition.id)).toEqual(competition);
  });

  it('should not be able to get a competition with wrong id', async () => {
    await expect(showCompetition.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
