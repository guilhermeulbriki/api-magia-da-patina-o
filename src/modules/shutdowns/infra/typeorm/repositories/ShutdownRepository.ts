import { getRepository, Repository } from 'typeorm';

import IShutdownRepository from '@modules/shutdowns/repositories/IShutdownRepository';
import ICreateShutdownDTO from '@modules/shutdowns/dtos/ICreateShutdownDTO';

import Shutdown from '../entities/Shutdown';

class ScheduleRepository implements IShutdownRepository {
  private ormRepository: Repository<Shutdown>;

  constructor() {
    this.ormRepository = getRepository(Shutdown);
  }

  public async list(): Promise<Shutdown[]> {
    return this.ormRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  public async create(shudtwonData: ICreateShutdownDTO): Promise<Shutdown> {
    const shutdown = await this.ormRepository.create(shudtwonData);

    await this.ormRepository.save(shutdown);

    return shutdown;
  }

  public async save(shutdown: Shutdown): Promise<Shutdown> {
    return this.ormRepository.save(shutdown);
  }

  public async findBySponsorName(name: string): Promise<Shutdown | undefined> {
    const shutdown = await this.ormRepository.findOne({
      where: { sponsor_name: name },
    });

    return shutdown;
  }
}

export default ScheduleRepository;
