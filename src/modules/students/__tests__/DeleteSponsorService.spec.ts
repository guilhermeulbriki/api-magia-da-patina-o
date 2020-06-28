import AppError from '@shared/errors/AppError';
import DeleteSponsorService from '../services/DeleteSponsorService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let deleteSponsor: DeleteSponsorService;

describe('DeleteStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();

    deleteSponsor = new DeleteSponsorService(fakeStudentsRepository);
  });

  it('should be able to delete a student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      born: new Date(2020),
      gender: 'masculino',
      sponsor_id: '123',
    });

    await deleteSponsor.execute(student.id);

    const students = await fakeStudentsRepository.list();

    expect(students).toEqual([]);
  });

  it('should not be able to delete a student if does not exist', async () => {
    await expect(deleteSponsor.execute('123')).rejects.toBeInstanceOf(AppError);
  });
});
