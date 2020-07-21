import AppError from '@shared/errors/AppError';

import UpdateCompetitionService from '../services/UpdateCompetitionService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionRepository: FakeCompetitionRepository;

let updateCompetition: UpdateCompetitionService;

describe('UpdateCompetition', () => {
  beforeEach(() => {
    fakeCompetitionRepository = new FakeCompetitionRepository();

    updateCompetition = new UpdateCompetitionService(fakeCompetitionRepository);
  });

  it('should be able to update the competition', async () => {
    const competition = await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    const updatedCompetition = await updateCompetition.execute({
      id: competition.id,
      award: 1,
      category: 'juvenil',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    expect(updatedCompetition.category).toBe('juvenil');
  });

  it('should not be able to update a schedule if group does not exist', async () => {
    await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    await expect(
      updateCompetition.execute({
        id: 'WRONG_ID',
        award: 1,
        category: 'mirim',
        city: 'fw',
        date: new Date(Date.now()),
        name: 'copa',
        student_name: 'guilherme',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
