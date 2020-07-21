// import AppError from '@shared/errors/AppError';

import CreateCompetitionService from '../services/CreateCompetitionService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionRepository: FakeCompetitionRepository;

let createCompetition: CreateCompetitionService;

describe('CreateCompetition', () => {
  beforeEach(() => {
    fakeCompetitionRepository = new FakeCompetitionRepository();

    createCompetition = new CreateCompetitionService(fakeCompetitionRepository);
  });

  it('should be able to create a new competition', async () => {
    const competition = await createCompetition.execute({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    expect(competition).toHaveProperty('id');
  });
});
