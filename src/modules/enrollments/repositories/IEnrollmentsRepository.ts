import Enrollment from '../infra/typeorm/entities/Enrollments';

export default interface IEnrollmentsRepository {
  list(): Promise<Enrollment[]>;
  create(student_id: string): Promise<Enrollment>;
  save(enrollment: Enrollment): Promise<Enrollment>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Enrollment | undefined>;
  findByStudentId(student_id: string): Promise<Enrollment | undefined>;
}
