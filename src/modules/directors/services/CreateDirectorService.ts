import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';

import Director from '../infra/typeorm/entities/Director';

interface IRequestDTO {
  president: string;
  vice: string;
  start: Date;
  end: Date;
}

@injectable()
class CreateDirectorsService {
  constructor(
    @inject('DirectorsRepository')
    private directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Director> {
    return this.directorsRepository.create(data);
  }
}

export default CreateDirectorsService;
