import ListEnrollmentsService from '../services/ListEnrollmentsService';
import FakeEnrollmentsRepository from '../repositories/fakes/FakeEnrollmentsRepository';

let fakeEnrollmentsRepository: FakeEnrollmentsRepository;

let listEnrollments: ListEnrollmentsService;

describe('ListEnrollments', () => {
  beforeEach(() => {
    fakeEnrollmentsRepository = new FakeEnrollmentsRepository();

    listEnrollments = new ListEnrollmentsService(fakeEnrollmentsRepository);
  });

  it('should be able to list all enrollments', async () => {
    const enrollment1 = await fakeEnrollmentsRepository.create('123');

    const enrollment2 = await fakeEnrollmentsRepository.create('321');

    const enrolments = await listEnrollments.execute();

    expect(enrolments).toEqual([enrollment1, enrollment2]);
  });
});
