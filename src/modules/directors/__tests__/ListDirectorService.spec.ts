import ListDirectorsService from '../services/ListDirectorsService';
import FakeDirectorsRepository from '../repositories/fakes/FakeDirectorsRepository';

let fakeDirectorRepository: FakeDirectorsRepository;

let listDirector: ListDirectorsService;

describe('listDirector', () => {
  beforeEach(() => {
    fakeDirectorRepository = new FakeDirectorsRepository();

    listDirector = new ListDirectorsService(fakeDirectorRepository);
  });

  it('should be able to list all directors', async () => {
    const director1 = await fakeDirectorRepository.create({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    const director2 = await fakeDirectorRepository.create({
      president: 'fw',
      vice: 'pascoa',
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    });

    const directors = await listDirector.execute();

    expect(directors).toEqual([director1, director2]);
  });
});
