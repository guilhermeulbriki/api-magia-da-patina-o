import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IShutdownRepository from '@modules/shutdowns/repositories/IShutdownRepository';
import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import Shutdown from '../infra/typeorm/entities/Shutdown';

interface IRequestDTO {
  reason: string;
  sponsor_name: string;
}

@injectable()
class CreateShutdownService {
  constructor(
    @inject('ShutdownRepository')
    private shutdownRepository: IShutdownRepository,

    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute({
    sponsor_name,
    reason,
  }: IRequestDTO): Promise<Shutdown> {
    const checkShutdownExist = await this.shutdownRepository.findBySponsorName(
      sponsor_name,
    );

    if (checkShutdownExist) {
      throw new AppError('Este responsável já se desligou do clube');
    }

    const sponsor = await this.sponsorRepository.findByName(sponsor_name);

    if (!sponsor) {
      throw new AppError('Responsável não encontrado');
    }

    await this.sponsorRepository.delete(sponsor.id);

    return this.shutdownRepository.create({
      reason,
      sponsor_name,
    });
  }
}

export default CreateShutdownService;
