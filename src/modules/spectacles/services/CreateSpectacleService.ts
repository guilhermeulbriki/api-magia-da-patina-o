import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

import Spectacle from '../infra/typeorm/entities/Spectacle';

interface IRequestDTO {
  theme: string;
  local: string;
  date: Date;
  public: number;
}

@injectable()
class CreateSpectaclesService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Spectacle> {
    return this.spectacleRepository.create(data);
  }
}

export default CreateSpectaclesService;
