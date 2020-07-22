import { getRepository, Repository } from 'typeorm';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';
import ICreateDirectorDTO from '@modules/directors/dtos/ICreateDirectorDTO';

import Director from '../entities/Director';

class DirectorRepository implements IDirectorsRepository {
  private ormRepository: Repository<Director>;

  constructor() {
    this.ormRepository = getRepository(Director);
  }

  public async list(): Promise<Director[]> {
    return this.ormRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  public async create(data: ICreateDirectorDTO): Promise<Director> {
    const director = await this.ormRepository.create(data);

    await this.ormRepository.save(director);

    return director;
  }

  public async save(director: Director): Promise<Director> {
    return this.ormRepository.save(director);
  }

  public async findById(id: string): Promise<Director | undefined> {
    const director = await this.ormRepository.findOne({
      where: { id },
    });

    return director;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default DirectorRepository;
