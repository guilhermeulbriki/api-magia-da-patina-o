import ListSpectaclesService from '../services/ListSpectaclesService';
import FakeEspectacleRepository from '../repositories/fakes/FakeEspectacleRepository';

let fakeSpectaclesRepository: FakeEspectacleRepository;

let listSpectacle: ListSpectaclesService;

describe('listSpectacles', () => {
  beforeEach(() => {
    fakeSpectaclesRepository = new FakeEspectacleRepository();

    listSpectacle = new ListSpectaclesService(fakeSpectaclesRepository);
  });

  it('should be able to list all spectacles', async () => {
    const spectacle1 = await fakeSpectaclesRepository.create({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'natal',
    });

    const spectacle2 = await fakeSpectaclesRepository.create({
      date: new Date(Date.now()),
      local: 'fw',
      public: 123,
      theme: 'pascoa',
    });

    const spectacles = await listSpectacle.execute({
      order: 'DESC',
    });

    expect(spectacles).toEqual([spectacle1, spectacle2]);
  });
});
