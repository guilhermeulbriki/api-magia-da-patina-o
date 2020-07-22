import { uuid } from 'uuidv4';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';
import ICreateSpectacleDTO from '@modules/spectacles/dtos/ICreateSpectacleDTO';

import Spectacle from '../../infra/typeorm/entities/Spectacle';

class FakeSpectacleRepository implements ISpectacleRepository {
  private spectacles: Spectacle[] = [];

  public async findById(id: string): Promise<Spectacle | undefined> {
    const findedSpectacle = this.spectacles.find(
      spectacle => spectacle.id === id,
    );

    return findedSpectacle;
  }

  public async list(): Promise<Spectacle[]> {
    return this.spectacles;
  }

  public async create(data: ICreateSpectacleDTO): Promise<Spectacle> {
    const spectacle = new Spectacle();

    Object.assign(spectacle, { id: uuid() }, data);

    this.spectacles.push(spectacle);

    return spectacle;
  }

  public async save(spectacle: Spectacle): Promise<Spectacle> {
    const findIndex = this.spectacles.findIndex(
      findSpectacle => findSpectacle.id === spectacle.id,
    );

    this.spectacles[findIndex] = spectacle;

    return spectacle;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.spectacles.findIndex(
      spectacle => spectacle.id === id,
    );

    this.spectacles.splice(findIndex, 1);
  }
}

export default FakeSpectacleRepository;
