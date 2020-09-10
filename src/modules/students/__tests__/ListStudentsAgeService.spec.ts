import ListStudentsAgeService from '../services/ListStudentsAgesService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;

let listStudentAge: ListStudentsAgeService;

describe('ListStudentsAge', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    listStudentAge = new ListStudentsAgeService(fakeStudentsRepository);
  });

  it('should be able to list all students', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      age: 10,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '456',
    });

    const student2 = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      age: 8,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '456',
    });

    const students = await listStudentAge.execute();

    expect(students).toEqual([student1, student2]);
  });
});
