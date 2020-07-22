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

  public async execute(skip: number): Promise<Director[]> {
    const page = (skip - 1) * 3;
    return this.directorsRepository.list(page);
  }
}

export default ListDirectorsService;
