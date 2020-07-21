import ListShutdownsService from '../services/ListShutdownsService';
import FakeShutdownRepository from '../repositories/fakes/FakeShutdownRepository';

let fakeShutdowRepository: FakeShutdownRepository;

let listShutdown: ListShutdownsService;

describe('listShutdowns', () => {
  beforeEach(() => {
    fakeShutdowRepository = new FakeShutdownRepository();

    listShutdown = new ListShutdownsService(fakeShutdowRepository);
  });

  it('should be able to list all shutdowns', async () => {
    const shutdown1 = await fakeShutdowRepository.create({
      reason: 'mt mao patinar',
      sponsor_name: '123',
    });

    const shutdown2 = await fakeShutdowRepository.create({
      reason: 'mt mao patinar',
      sponsor_name: '1234',
    });

    const shutdowns = await listShutdown.execute();

    expect(shutdowns).toEqual([shutdown1, shutdown2]);
  });
});
