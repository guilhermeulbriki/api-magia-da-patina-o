// import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';

import Director from '../infra/typeorm/entities/Director';

@injectable()
class ListDirectorsService {
  constructor(
    @inject('DirectorsRepository')
    private directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(): Promise<Director[]> {
    return this.directorsRepository.list();
  }
}

export default ListDirectorsService;
