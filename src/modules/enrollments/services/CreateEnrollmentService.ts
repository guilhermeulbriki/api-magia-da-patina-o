import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IEnrollmentsRepository from '@modules/enrollments/repositories/IEnrollmentsRepository';
import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Enrollment from '../infra/typeorm/entities/Enrollments';

interface CreateEnrollment {
  student_id: string;
}

@injectable()
class CreateEnrollmentService {
  constructor(
    @inject('EnrollmentsRepository')
    private enrollmentsRepository: IEnrollmentsRepository,

    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(student_id: string): Promise<Enrollment> {
    const findedStudent = await this.enrollmentsRepository.findByStudentId(
      student_id,
    );

    if (findedStudent) {
      throw new AppError('Este aluno já se encontra matriculado');
    }

    const enrollment = await this.enrollmentsRepository.create(student_id);

    const student = await this.studentRepository.findById(student_id);

    if (!student) {
      throw new AppError('Aluno não encontrado');
    }

    student.enrollment = enrollment;

    await this.studentRepository.save(student);

    return enrollment;
  }
}

export default CreateEnrollmentService;
