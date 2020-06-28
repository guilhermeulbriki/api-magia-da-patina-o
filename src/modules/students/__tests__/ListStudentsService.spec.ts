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
      born: new Date(2020),
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
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '456',
    });

    const students = await listStudent.execute();

    expect(students).toEqual([student1, student2]);
  });
});
