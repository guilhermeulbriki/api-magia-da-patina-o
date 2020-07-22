import AppError from '@shared/errors/AppError';
import UpdateDirectorService from '../services/UpdateDirectorService';
import FakeDirectorsRepository from '../repositories/fakes/FakeDirectorsRepository';

let fakeDirectorsRepository: FakeDirectorsRepository;

let updateDirector: UpdateDirectorService;

describe('UpdateDirector', () => {
  beforeEach(() => {
    fakeDirectorsRepository = new FakeDirectorsRepository();

    updateDirector = new UpdateDirectorService(fakeDirectorsRepository);
  });

  it('should be able to update the director', async () => {
    const director = await fakeDirectorsRepository.create({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    const updatedDirector = await updateDirector.execute({
      id: director.id,
      president: 'fw',
      vice: 'guilherme',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    expect(updatedDirector.vice).toBe('guilherme');
  });

  it('should not be able to update a director if does not exist', async () => {
    await expect(
      updateDirector.execute({
        id: 'WRONG_ID',
        president: 'fw',
        vice: 'pascoa',
        start: new Date(Date.now()),
        end: new Date(Date.now()),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
