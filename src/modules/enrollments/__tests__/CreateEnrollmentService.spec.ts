import AppError from '@shared/errors/AppError';

import FakeStudentRepository from '@modules/students/repositories/fakes/FakeStudentRepository';
import CreateEnrollmentService from '../services/CreateEnrollmentService';
import FakeEnrollmentsRepository from '../repositories/fakes/FakeEnrollmentsRepository';

let fakeEnrollmentsRepository: FakeEnrollmentsRepository;
let fakeStudentRepository: FakeStudentRepository;
let createEnrollment: CreateEnrollmentService;

describe('CreateEnrollments', () => {
  beforeEach(() => {
    fakeEnrollmentsRepository = new FakeEnrollmentsRepository();

    createEnrollment = new CreateEnrollmentService(
      fakeEnrollmentsRepository,
      fakeStudentRepository,
    );
  });

  it('should be able to register a new enrollment', async () => {
    const enrollment = await createEnrollment.execute('123');

    expect(enrollment).toHaveProperty('id');
  });

  it('should not be able to register a enrollment if the student is already registered', async () => {
    const enrollment = await createEnrollment.execute('123');

    await expect(
      createEnrollment.execute(enrollment.student_id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
