import Student from '../infra/typeorm/entities/Students';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

export default interface IStudentRepository {
  list(skip: number): Promise<Student[]>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(sponsor: Student): Promise<Student>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<Student | undefined>;
  findByCpf(cpf: string): Promise<Student | undefined>;
  findByRg(rg: string): Promise<Student | undefined>;
  findById(id: string): Promise<Student | undefined>;
  findBySponsor(sponsor_id: string): Promise<Student[]>;
}
