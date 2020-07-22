import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';

import Director from '../infra/typeorm/entities/Director';

interface IRequestDTO {
  id: string;
  president: string;
  vice: string;
  start: Date;
  end: Date;
}

@injectable()
class UpdateDirectorService {
  constructor(
    @inject('DirectorsRepository')
    private directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Director> {
    const director = await this.directorsRepository.findById(data.id);

    if (!director) {
      throw new AppError('Diretoria não encontrada');
    }

    director.president = data.president;
    director.vice = data.vice;
    director.start = data.start;
    director.end = data.end;

    return this.directorsRepository.save(director);
  }
}

export default UpdateDirectorService;
