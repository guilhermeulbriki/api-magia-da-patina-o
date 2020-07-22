// import AppError from '@shared/errors/AppError';

import CreateSpectacleService from '../services/CreateSpectacleService';
import FakeEspectacleRepository from '../repositories/fakes/FakeEspectacleRepository';

let fakeSpectacleRepository: FakeEspectacleRepository;

let createSpectacle: CreateSpectacleService;

describe('CreateSpectacle', () => {
  beforeEach(() => {
    fakeSpectacleRepository = new FakeEspectacleRepository();

    createSpectacle = new CreateSpectacleService(fakeSpectacleRepository);
  });

  it('should be able to create a new spectacle', async () => {
    const spectacle = await createSpectacle.execute({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'pascoa',
    });

    expect(spectacle).toHaveProperty('id');
  });
});
