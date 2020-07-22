import AppError from '@shared/errors/AppError';
import DeleteDirectorService from '../services/DeleteDirectorService';
import FakeDirectorsRepository from '../repositories/fakes/FakeDirectorsRepository';

let fakeDirectorsRepository: FakeDirectorsRepository;
let deleteDirector: DeleteDirectorService;

describe('DeleteDirector', () => {
  beforeEach(() => {
    fakeDirectorsRepository = new FakeDirectorsRepository();

    deleteDirector = new DeleteDirectorService(fakeDirectorsRepository);
  });

  it('should be able to delete a director', async () => {
    const director = await fakeDirectorsRepository.create({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    await deleteDirector.execute(director.id);

    const directors = await fakeDirectorsRepository.list();

    expect(directors).toEqual([]);
  });

  it('should not be able to delete a director if does not exist', async () => {
    await expect(deleteDirector.execute('WRONG_ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
