import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';

import Students from '../infra/typeorm/entities/Students';

@injectable()
class AlterUserGroupService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(group_id: string, id: string): Promise<Students> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new AppError('Aluno não encontrado');
    }

    const group = await this.groupsRepository.findById(group_id);

    if (!group) {
      throw new AppError('Turma não encontrada');
    }

    student.group = group;

    return this.studentRepository.save(student);
  }
}

export default AlterUserGroupService;
