import { uuid } from 'uuidv4';

import ICompetitionRepository from '@modules/competitions/repositories/ICompetitionRepository';
import ICreateCompetitionDTO from '@modules/competitions/dtos/ICreateCompetitionDTO';

import Competition from '../../infra/typeorm/entities/Competition';

class FakeSchedulesRepository implements ICompetitionRepository {
  private competitions: Competition[] = [];

  public async findById(id: string): Promise<Competition | undefined> {
    const findSponsorById = this.competitions.find(
      competition => competition.id === id,
    );

    return findSponsorById;
  }

  public async list(): Promise<Competition[]> {
    return this.competitions;
  }

  public async create(
    scheduleData: ICreateCompetitionDTO,
  ): Promise<Competition> {
    const schedule = new Competition();

    Object.assign(schedule, { id: uuid() }, scheduleData);

    this.competitions.push(schedule);

    return schedule;
  }

  public async save(competition: Competition): Promise<Competition> {
    const findIndex = this.competitions.findIndex(
      findCompetition => findCompetition.id === competition.id,
    );

    this.competitions[findIndex] = competition;

    return competition;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.competitions.findIndex(
      competition => competition.id === id,
    );

    this.competitions.splice(findIndex, 1);
  }
}

export default FakeSchedulesRepository;
