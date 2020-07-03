import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Students';

interface IRequestDTO {
  student_data: {
    name: string;
    email: string;
    age: number;
    rg: string;
    cpf: string;
    phone: string;
    whatsapp: string;
    group_id: string;
    gender: 'masculino' | 'feminino';
  };
  sponsor_id: string;
}

@injectable()
class CreateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute({
    student_data,
    sponsor_id,
  }: IRequestDTO): Promise<Student> {
    const checkSponsorExists = await this.studentRepository.findByEmail(
      student_data.email,
    );

    if (checkSponsorExists) {
      throw new AppError('Este email já está sendo usado');
    }

    const checkCpfIsAvailable = await this.studentRepository.findByCpf(
      student_data.cpf,
    );

    if (checkCpfIsAvailable) {
      throw new AppError('Este cpf já está sendo usado');
    }

    const checkRgIsAvailable = await this.studentRepository.findByRg(
      student_data.rg,
    );

    if (checkRgIsAvailable) {
      throw new AppError('Este rg já está sendo usado');
    }

    const formateData = {
      name: student_data.name,
      email: student_data.email,
      age: student_data.age,
      rg: student_data.rg,
      cpf: student_data.cpf,
      phone: student_data.phone,
      whatsapp: student_data.whatsapp,
      gender: student_data.gender,
      group_id: student_data.group_id,
      sponsor_id,
    };

    return this.studentRepository.create(formateData);
  }
}

export default CreateStudentService;
