import AppError from '@shared/errors/AppError';
import DeleteCompetitionService from '../services/DeleteCompetitionService';
import FakeCompetitionRepository from '../repositories/fakes/FakeCompetitionRepository';

let fakeCompetitionRepository: FakeCompetitionRepository;
let deleteCompetition: DeleteCompetitionService;

describe('DeleteCompetition', () => {
  beforeEach(() => {
    fakeCompetitionRepository = new FakeCompetitionRepository();

    deleteCompetition = new DeleteCompetitionService(fakeCompetitionRepository);
  });

  it('should be able to delete a competition', async () => {
    const competition = await fakeCompetitionRepository.create({
      award: 1,
      category: 'mirim',
      city: 'fw',
      date: new Date(Date.now()),
      name: 'copa',
      student_name: 'guilherme',
    });

    await deleteCompetition.execute(competition.id);

    const competitions = await fakeCompetitionRepository.list();

    expect(competitions).toEqual([]);
  });

  it('should not be able to delete a competition if does not exist', async () => {
    await expect(deleteCompetition.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
