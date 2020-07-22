import AppError from '@shared/errors/AppError';

import ShowDirectorsService from '../services/ShowDirectorsService';
import FakeDirectorsRepository from '../repositories/fakes/FakeDirectorsRepository';

let fakeDirectorsRepository: FakeDirectorsRepository;
let showDirector: ShowDirectorsService;

describe('ShowDirector', () => {
  beforeEach(() => {
    fakeDirectorsRepository = new FakeDirectorsRepository();

    showDirector = new ShowDirectorsService(fakeDirectorsRepository);
  });

  it('should be able to show a director', async () => {
    const director = await fakeDirectorsRepository.create({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    expect(await showDirector.execute(director.id)).toEqual(director);
  });

  it('should not be able to get a director with wrong id', async () => {
    await expect(showDirector.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
