import AppError from '@shared/errors/AppError';

import CreateStudentService from '../services/CreateStudentService';
import FindByIdService from '../services/FindByIdService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let createStudent: CreateStudentService;
let findById: FindByIdService;

describe('ShowprofileStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    createStudent = new CreateStudentService(fakeStudentsRepository);
    findById = new FindByIdService(fakeStudentsRepository);
  });

  it('should be able to get a student with their id', async () => {
    const student = await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'email@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        born: new Date(2020),
        gender: 'masculino',
      },
      sponsor_id: '123',
    });

    expect(await findById.execute(student.id)).toEqual(student);
  });

  it('should not be able to get a student with wrong id', async () => {
    await expect(findById.execute('WRONG-ID')).rejects.toBeInstanceOf(AppError);
  });
});
