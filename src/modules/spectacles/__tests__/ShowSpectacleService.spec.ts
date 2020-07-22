import AppError from '@shared/errors/AppError';

import ShowSpectacleService from '../services/ShowSpectacleService';
import FakeEspectacleRepository from '../repositories/fakes/FakeEspectacleRepository';

let fakeEspectacleRepository: FakeEspectacleRepository;
let showSpectacle: ShowSpectacleService;

describe('ShowSpectacle', () => {
  beforeEach(() => {
    fakeEspectacleRepository = new FakeEspectacleRepository();

    showSpectacle = new ShowSpectacleService(fakeEspectacleRepository);
  });

  it('should be able to show a spectacle', async () => {
    const spectacle = await fakeEspectacleRepository.create({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'pascoa',
    });

    expect(await showSpectacle.execute(spectacle.id)).toEqual(spectacle);
  });

  it('should not be able to get a spectacle with wrong id', async () => {
    await expect(showSpectacle.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
