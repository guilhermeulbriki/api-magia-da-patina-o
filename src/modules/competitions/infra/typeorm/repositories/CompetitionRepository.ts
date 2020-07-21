import { getRepository, Repository } from 'typeorm';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';
import ICreateCompetitionDTO from '@modules/competitions/dtos/ICreateCompetitionDTO';

import Competition from '../entities/Competition';

class ScheduleRepository implements ICompetitionRepository {
  private ormRepository: Repository<Competition>;

  constructor() {
    this.ormRepository = getRepository(Competition);
  }

  public async list(): Promise<Competition[]> {
    return this.ormRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  public async create(data: ICreateCompetitionDTO): Promise<Competition> {
    const competition = await this.ormRepository.create(data);

    await this.ormRepository.save(competition);

    return competition;
  }

  public async save(competition: Competition): Promise<Competition> {
    return this.ormRepository.save(competition);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async findById(id: string): Promise<Competition | undefined> {
    const competition = await this.ormRepository.findOne({
      where: { id },
    });

    return competition;
  }
}

export default ScheduleRepository;
