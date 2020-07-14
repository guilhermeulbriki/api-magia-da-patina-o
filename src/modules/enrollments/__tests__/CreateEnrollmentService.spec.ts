// import AppError from '@shared/errors/AppError';

import CreateEnrollmentService from '../services/CreateEnrollmentService';
import FakeEnrollmentsRepository from '../repositories/fakes/FakeEnrollmentsRepository';

let fakeEnrollmentsRepository: FakeEnrollmentsRepository;
let createEnrollment: CreateEnrollmentService;

describe('CreateEnrollments', () => {
  beforeEach(() => {
    fakeEnrollmentsRepository = new FakeEnrollmentsRepository();

    createEnrollment = new CreateEnrollmentService(fakeEnrollmentsRepository);
  });

  it('should be able to register a new enrollment', async () => {
    const enrollment = await createEnrollment.execute('123');

    expect(enrollment).toHaveProperty('id');
  });
});
