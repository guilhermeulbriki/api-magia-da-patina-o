import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IShutdownRepository from '@modules/shutdowns/repositories/IShutdownRepository';

import Shutdown from '../infra/typeorm/entities/Shutdown';

@injectable()
class ListShutdownsService {
  constructor(
    @inject('ShutdownRepository')
    private shutdownRepository: IShutdownRepository,
  ) {}

  public async execute(): Promise<Shutdown[]> {
    return this.shutdownRepository.list();
  }
}

export default ListShutdownsService;
