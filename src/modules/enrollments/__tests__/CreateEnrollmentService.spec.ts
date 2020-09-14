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
    fakeStudentRepository = new FakeStudentRepository();

    createEnrollment = new CreateEnrollmentService(
      fakeEnrollmentsRepository,
      fakeStudentRepository,
    );
  });

  it('should be able to register a new enrollment', async () => {
    const student = await fakeStudentRepository.create({
      age: 10,
      cpf: '04279531030',
      email: 'email@gmail.com',
      gender: 'masculino',
      group_id: '12143124',
      name: 'nome',
      phone: '55999579600',
      rg: '1234565789',
      sponsor_id: '1214245',
      whatsapp: '',
    });

    const enrollment = await createEnrollment.execute(student.id);

    expect(enrollment).toHaveProperty('id');
  });

  it('should not be able to register a enrollment if the student is already registered', async () => {
    const student = await fakeStudentRepository.create({
      age: 10,
      cpf: '04279531030',
      email: 'email@gmail.com',
      gender: 'masculino',
      group_id: '12143124',
      name: 'nome',
      phone: '55999579600',
      rg: '1234565789',
      sponsor_id: '1214245',
      whatsapp: '',
    });

    const enrollment = await createEnrollment.execute(student.id);

    await expect(
      createEnrollment.execute(enrollment.student_id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
