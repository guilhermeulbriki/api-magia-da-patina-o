import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';

import Director from '../infra/typeorm/entities/Director';

@injectable()
class ShowDirectorsService {
  constructor(
    @inject('DirectorsRepository')
    private directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(id: string): Promise<Director | undefined> {
    const director = await this.directorsRepository.findById(id);

    if (!director) {
      throw new AppError('Diretoria não encontrada');
    }

    return director;
  }
}

export default ShowDirectorsService;
