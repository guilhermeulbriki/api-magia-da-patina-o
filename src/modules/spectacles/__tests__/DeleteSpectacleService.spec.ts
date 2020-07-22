import AppError from '@shared/errors/AppError';
import DeleteSpectalceService from '../services/DeleteSpectalceService';
import FakeEspectacleRepository from '../repositories/fakes/FakeEspectacleRepository';

let fakeEspectacleRepository: FakeEspectacleRepository;
let deleteSpectacle: DeleteSpectalceService;

describe('DeleteSpectacle', () => {
  beforeEach(() => {
    fakeEspectacleRepository = new FakeEspectacleRepository();

    deleteSpectacle = new DeleteSpectalceService(fakeEspectacleRepository);
  });

  it('should be able to delete a spectacle', async () => {
    const spectacle = await fakeEspectacleRepository.create({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'pascoa',
    });

    await deleteSpectacle.execute(spectacle.id);

    const spectacles = await fakeEspectacleRepository.list();

    expect(spectacles).toEqual([]);
  });

  it('should not be able to delete a spectacle if does not exist', async () => {
    await expect(deleteSpectacle.execute('WRONG_ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
