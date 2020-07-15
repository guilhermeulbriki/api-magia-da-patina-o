import AppError from '@shared/errors/AppError';
import DeleteEnrollmentService from '../services/DeleteEnrollmentService';
import FakeEnrollmentsRepository from '../repositories/fakes/FakeEnrollmentsRepository';

let fakeEnrollmentsRepository: FakeEnrollmentsRepository;
let deleteEnrollment: DeleteEnrollmentService;

describe('DeleteEnrollment', () => {
  beforeEach(() => {
    fakeEnrollmentsRepository = new FakeEnrollmentsRepository();

    deleteEnrollment = new DeleteEnrollmentService(fakeEnrollmentsRepository);
  });

  it('should be able to delete a enrollment', async () => {
    const enrollment = await fakeEnrollmentsRepository.create('123');

    await deleteEnrollment.execute(enrollment.student_id);

    const enrollments = await fakeEnrollmentsRepository.list();

    expect(enrollments).toEqual([]);
  });

  it('should not be able to delete a enrollment if does not exist', async () => {
    await expect(deleteEnrollment.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
