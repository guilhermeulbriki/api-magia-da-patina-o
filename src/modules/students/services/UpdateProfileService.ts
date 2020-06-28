import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/students/repositories/IStudentRepository';

import Students from '../infra/typeorm/entities/Students';

interface IRequestDTO {
  id: string;
  name: string;
  email: string;
  born: Date;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
}

@injectable()
class UpdateStudantService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Students> {
    const student = await this.studentRepository.findById(data.id);

    if (!student) {
      throw new AppError('Aluno não encontrado');
    }

    const checkSponsorExists = await this.studentRepository.findByEmail(
      data.email,
    );

    if (checkSponsorExists && data.email !== student.email) {
      throw new AppError('Este email já está sendo usado');
    }

    const checkCpfIsAvailable = await this.studentRepository.findByCpf(
      data.cpf,
    );

    if (checkCpfIsAvailable && data.cpf !== student.cpf) {
      throw new AppError('Este cpf já está sendo usado');
    }

    const checkRgIsAvailable = await this.studentRepository.findByRg(data.rg);

    if (checkRgIsAvailable && data.rg !== student.rg) {
      throw new AppError('Este rg já está sendo usado');
    }

    student.name = data.name;
    student.email = data.email;
    student.born = data.born;
    student.rg = data.rg;
    student.cpf = data.cpf;
    student.phone = data.phone;
    student.whatsapp = data.whatsapp;
    student.gender = data.gender;

    return this.studentRepository.save(student);
  }
}

export default UpdateStudantService;
