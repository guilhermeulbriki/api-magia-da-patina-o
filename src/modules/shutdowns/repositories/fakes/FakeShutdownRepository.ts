import { uuid } from 'uuidv4';

import IShutdownRepository from '@modules/shutdowns/repositories/IShutdownRepository';
import ICreateShutdownDTO from '@modules/shutdowns/dtos/ICreateShutdownDTO';

import Shutdown from '../../infra/typeorm/entities/Shutdown';

class FakeSchedulesRepository implements IShutdownRepository {
  private shutdowns: Shutdown[] = [];

  public async findBySponsorName(name: string): Promise<Shutdown | undefined> {
    const findShutdownById = this.shutdowns.find(
      shutdown => shutdown.sponsor_name === name,
    );

    return findShutdownById;
  }

  public async list(): Promise<Shutdown[]> {
    return this.shutdowns;
  }

  public async create(data: ICreateShutdownDTO): Promise<Shutdown> {
    const shutdown = new Shutdown();

    Object.assign(shutdown, { id: uuid() }, data);

    this.shutdowns.push(shutdown);

    return shutdown;
  }

  public async save(shutdown: Shutdown): Promise<Shutdown> {
    const findIndex = this.shutdowns.findIndex(
      findShutdown => findShutdown.id === shutdown.id,
    );

    this.shutdowns[findIndex] = shutdown;

    return shutdown;
  }
}

export default FakeSchedulesRepository;
