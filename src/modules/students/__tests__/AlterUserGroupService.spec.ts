import AppError from '@shared/errors/AppError';
import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import AlterUserGroupService from '../services/AlterUserGroupService';
import FakeStudentRepository from '../repositories/fakes/FakeStudentRepository';

let fakeStudentsRepository: FakeStudentRepository;
let fakeGroupsRepository: FakeGroupsRepository;

let alterGroup: AlterUserGroupService;

describe('AlterGroup', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentRepository();
    fakeGroupsRepository = new FakeGroupsRepository();

    alterGroup = new AlterUserGroupService(
      fakeStudentsRepository,
      fakeGroupsRepository,
    );
  });

  it('should be able to alter the student group', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      age: 10,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '123',
    });

    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'gui',
      name: 'branca',
    });

    const updatedStudent = await alterGroup.execute(group.id, student.id);

    expect(updatedStudent.group.id).toBe(group.id);
  });

  it('should not be able to alter the student group if student does not exist', async () => {
    const group = await fakeGroupsRepository.create({
      city: 'fw',
      color: 'branca',
      instructor: 'gui',
      name: 'branca',
    });

    await expect(
      alterGroup.execute(group.id, 'WRONG-ID'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to alter the student group if student does not exist', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'nome',
      email: 'email3@gmail.com',
      cpf: '4781242',
      rg: '427847284',
      phone: '123',
      whatsapp: '123',
      age: 10,
      group_id: '123',
      gender: 'masculino',
      sponsor_id: '123',
    });

    await expect(
      alterGroup.execute('WRONG-ID', student.id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
