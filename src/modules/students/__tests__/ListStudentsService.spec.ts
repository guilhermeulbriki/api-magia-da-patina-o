import ListStudentsService from '../services/ListStudentsService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;

let listStudent: ListStudentsService;

describe('ListStudents', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    listStudent = new ListStudentsService(fakeStudentsRepository);
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
      age: 10,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '456',
    });

    const dataFilter = {
      age: 0,
      name: '',
      group: '',
      skip: 0,
    };

    const students = await listStudent.execute(dataFilter);

    expect(students).toEqual([student1, student2]);
  });

  it('should list only students with 10 years', async () => {
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

    await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      age: 9,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '456',
    });

    const dataFilter = {
      age: 10,
      name: '',
      group: '',
      skip: 0,
    };

    const students = await listStudent.execute(dataFilter);

    expect(students).toEqual([student1]);
  });

  it('should list only students with name like "ed"', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'eduardo',
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

    await fakeStudentsRepository.create({
      name: 'amanda',
      email: 'email@gmail.com',
      cpf: '123',
      rg: '123',
      phone: '123',
      whatsapp: '123',
      age: 9,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '456',
    });

    const dataFilter = {
      age: 0,
      name: 'ed',
      group: '',
      skip: 0,
    };

    const students = await listStudent.execute(dataFilter);

    expect(students).toEqual([student1]);
  });
});
