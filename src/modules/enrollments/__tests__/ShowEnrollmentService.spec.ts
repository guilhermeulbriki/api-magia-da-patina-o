import AppError from '@shared/errors/AppError';

import ShowEnrollmentService from '../services/ShowEnrollmentService';
import FakeEnrollmentsRepository from '../repositories/fakes/FakeEnrollmentsRepository';

let fakeEnrollmentRepository: FakeEnrollmentsRepository;
let showEnrollment: ShowEnrollmentService;

describe('ShowEnrollment', () => {
  beforeEach(() => {
    fakeEnrollmentRepository = new FakeEnrollmentsRepository();

    showEnrollment = new ShowEnrollmentService(fakeEnrollmentRepository);
  });

  it('should be able to get a enrollment with id', async () => {
    const enrollment = await fakeEnrollmentRepository.create('123');

    expect(await showEnrollment.execute(enrollment.id)).toEqual(enrollment);
  });

  it('should not be able to get a enrollment with wrong id', async () => {
    await expect(showEnrollment.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
