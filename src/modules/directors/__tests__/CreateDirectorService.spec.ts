// import AppError from '@shared/errors/AppError';

import CreateDirectorService from '../services/CreateDirectorService';
import FakeDirectorsRepository from '../repositories/fakes/FakeDirectorsRepository';

let fakeDirectorRepository: FakeDirectorsRepository;

let createDirector: CreateDirectorService;

describe('CreateDirector', () => {
  beforeEach(() => {
    fakeDirectorRepository = new FakeDirectorsRepository();

    createDirector = new CreateDirectorService(fakeDirectorRepository);
  });

  it('should be able to create a new director', async () => {
    const director = await createDirector.execute({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    expect(director).toHaveProperty('id');
  });
});
