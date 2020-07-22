import AppError from '@shared/errors/AppError';
import UpdateSpectacleService from '../services/UpdateSpectacleService';
import FakeEspectacleRepository from '../repositories/fakes/FakeEspectacleRepository';

let fakeEspectacleRepository: FakeEspectacleRepository;

let updateSpectacle: UpdateSpectacleService;

describe('UpdateSpectacle', () => {
  beforeEach(() => {
    fakeEspectacleRepository = new FakeEspectacleRepository();

    updateSpectacle = new UpdateSpectacleService(fakeEspectacleRepository);
  });

  it('should be able to update the spectacle', async () => {
    const spectacle = await fakeEspectacleRepository.create({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'pascoa',
    });

    const updatedSpectacle = await updateSpectacle.execute({
      id: spectacle.id,
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'natal',
    });

    expect(updatedSpectacle.theme).toBe('natal');
  });

  it('should not be able to update a spéctacle if does not exist', async () => {
    await expect(
      updateSpectacle.execute({
        id: 'WRONG_ID',
        date: new Date(Date.now()),
        local: 'fw',
        public: 123,
        theme: 'natal',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
