import { getRepository, Repository } from 'typeorm';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';
import ICreateSpectacleDTO from '@modules/spectacles/dtos/ICreateSpectacleDTO';
import IListOrderDTO from '@modules/spectacles/dtos/IListOrderDTO';

import Spectacle from '../entities/Spectacle';

class ScheduleRepository implements ISpectacleRepository {
  private ormRepository: Repository<Spectacle>;

  constructor() {
    this.ormRepository = getRepository(Spectacle);
  }

  public async list({ order, page }: IListOrderDTO): Promise<Spectacle[]> {
    return this.ormRepository.find({
      order: { public: order },
      skip: page,
      take: 20,
    });
  }

  public async create(data: ICreateSpectacleDTO): Promise<Spectacle> {
    const spectacle = await this.ormRepository.create(data);

    await this.ormRepository.save(spectacle);

    return spectacle;
  }

  public async save(spetacle: Spectacle): Promise<Spectacle> {
    return this.ormRepository.save(spetacle);
  }

  public async findById(id: string): Promise<Spectacle | undefined> {
    const spetacle = await this.ormRepository.findOne({
      where: { id },
    });

    return spetacle;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default ScheduleRepository;
