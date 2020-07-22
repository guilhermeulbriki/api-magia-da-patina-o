import { uuid } from 'uuidv4';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';
import ICreateDirectorDTO from '@modules/directors/dtos/ICreateDirectorDTO';

import Director from '../../infra/typeorm/entities/Director';

class FakeDirectorsRepository implements IDirectorsRepository {
  private directors: Director[] = [];

  public async findById(id: string): Promise<Director | undefined> {
    const findedDirector = this.directors.find(director => director.id === id);

    return findedDirector;
  }

  public async list(): Promise<Director[]> {
    return this.directors;
  }

  public async create(data: ICreateDirectorDTO): Promise<Director> {
    const director = new Director();

    Object.assign(director, { id: uuid() }, data);

    this.directors.push(director);

    return director;
  }

  public async save(director: Director): Promise<Director> {
    const findIndex = this.directors.findIndex(
      findDirector => findDirector.id === director.id,
    );

    this.directors[findIndex] = director;

    return director;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.directors.findIndex(director => director.id === id);

    this.directors.splice(findIndex, 1);
  }
}

export default FakeDirectorsRepository;
