import { uuid } from 'uuidv4';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

import Student from '../../infra/typeorm/entities/Students';

class FakeStudentsRepository implements IStudentRepository {
  private students: Student[] = [];

  public async findById(id: string): Promise<Student | undefined> {
    const findSponsorById = this.students.find(student => student.id === id);

    return findSponsorById;
  }

  public async listAges(): Promise<Student[]> {
    return this.students;
  }

  public async list(_: number): Promise<Student[]> {
    return this.students;
  }

  public async create(studentData: ICreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, { id: uuid() }, studentData);

    this.students.push(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      findStudent => findStudent.id === student.id,
    );

    this.students[findIndex] = student;

    return student;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.students.findIndex(student => student.id === id);

    this.students.splice(findIndex, 1);
  }

  public async findByRg(rg: string): Promise<Student | undefined> {
    const findStudentByRg = this.students.find(student => student.rg === rg);

    return findStudentByRg;
  }

  public async findByCpf(cpf: string): Promise<Student | undefined> {
    const findStudentByCpf = this.students.find(student => student.cpf === cpf);

    return findStudentByCpf;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const findStudentByEmail = this.students.find(
      student => student.email === email,
    );

    return findStudentByEmail;
  }

  public async findBySponsor(sponsor_id: string): Promise<Student[]> {
    const findedStudents = this.students.filter(
      student => student.sponsor_id === sponsor_id,
    );

    return findedStudents;
  }
}

export default FakeStudentsRepository;
