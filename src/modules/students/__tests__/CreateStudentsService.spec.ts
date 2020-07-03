import AppError from '@shared/errors/AppError';

import CreateStudentService from '../services/CreateStudentService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    createStudent = new CreateStudentService(fakeStudentsRepository);
  });

  it('should be able to create a new student', async () => {
    const student = await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'email@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        age: 10,
        group_id: '123',
        gender: 'masculino',
      },
      sponsor_id: '456',
    });

    expect(student).toHaveProperty('id');
    expect(student.sponsor_id).toBe('456');
  });

  it('should not be able to create a new student with same email from another', async () => {
    await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'SAME@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        age: 10,
        group_id: '123',
        gender: 'masculino',
      },
      sponsor_id: '456',
    });

    await expect(
      createStudent.execute({
        student_data: {
          name: 'nome',
          email: 'SAME@gmail.com',
          cpf: '1234',
          rg: '1234',
          phone: '123',
          whatsapp: '123',
          age: 10,
          group_id: '123',
          gender: 'masculino',
        },
        sponsor_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new student with same cpf from another', async () => {
    await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'email1@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        age: 10,
        group_id: '123',
        gender: 'masculino',
      },
      sponsor_id: '456',
    });

    await expect(
      createStudent.execute({
        student_data: {
          name: 'nome',
          email: 'email2@gmail.com',
          cpf: '123',
          rg: '1234',
          phone: '123',
          whatsapp: '123',
          age: 10,
          group_id: '123',
          gender: 'masculino',
        },
        sponsor_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new student with same rg from another', async () => {
    await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'email1@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        age: 10,
        group_id: '123',
        gender: 'masculino',
      },
      sponsor_id: '456',
    });

    await expect(
      createStudent.execute({
        student_data: {
          name: 'nome',
          email: 'email2@gmail.com',
          cpf: '1234',
          rg: '123',
          phone: '123',
          whatsapp: '123',
          age: 10,
          group_id: '123',
          gender: 'masculino',
        },
        sponsor_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
