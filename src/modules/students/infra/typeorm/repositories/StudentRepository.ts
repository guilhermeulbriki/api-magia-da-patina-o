import { getRepository, Repository } from 'typeorm';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

import Student from '../entities/Students';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async list(skip: number): Promise<Student[]> {
    return this.ormRepository.find({
      relations: ['sponsor', 'group', 'enrollment'],
      order: { created_at: 'DESC' },
      skip,
      take: 20,
    });
  }

  public async create(studentData: ICreateStudentDTO): Promise<Student> {
    const student = await this.ormRepository.create(studentData);

    await this.ormRepository.save(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    return this.ormRepository.save(student);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findByCpf(cpf: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: { cpf },
    });
  }

  public async findByRg(rg: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: { rg },
    });
  }

  public async findById(id: string): Promise<Student | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['sponsor', 'group', 'enrollment'],
    });
  }

  public async findBySponsor(sponsor_id: string): Promise<Student[]> {
    return this.ormRepository.find({
      where: {
        sponsor_id,
      },
    });
  }
}

export default StudentRepository;
