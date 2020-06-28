import AppError from '@shared/errors/AppError';

import FakeSponsorRepository from '@modules/sponsors/repositories/fakes/FakeSponsorRepository';
import CreateStudentService from '../services/CreateStudentService';
import FindBySponsorService from '../services/FindBySponsorService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let fakeSponsorRepository: FakeSponsorRepository;
let createStudent: CreateStudentService;
let findBySponsor: FindBySponsorService;

describe('FindBySponsor', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();
    fakeSponsorRepository = new FakeSponsorRepository();

    createStudent = new CreateStudentService(fakeStudentsRepository);
    findBySponsor = new FindBySponsorService(
      fakeStudentsRepository,
      fakeSponsorRepository,
    );
  });

  it('should be able to recover all the student with the same sponsor_id', async () => {
    const sponsor = await fakeSponsorRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      password: '123',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      type: 'mãe',
      gender: 'masculino',
      address: 'address',
    });

    const student = await createStudent.execute({
      student_data: {
        name: 'nome',
        email: 'email@gmail.com',
        cpf: '123',
        rg: '123',
        phone: '123',
        whatsapp: '123',
        age: 10,
        group: 'preta',
        gender: 'masculino',
      },
      sponsor_id: sponsor.id,
    });

    expect(await findBySponsor.execute(student.sponsor_id)).toEqual([student]);
  });

  it('should not be able to recover the students with wrong sponsor_id', async () => {
    await expect(findBySponsor.execute('WRONG-ID')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
