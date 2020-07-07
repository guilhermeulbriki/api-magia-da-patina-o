import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Sponsor from '../infra/typeorm/entities/Sponsors';
import ISponsorRepository from '../repositories/ISponsorRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  sponsor: Sponsor;
  token: string;
}

@injectable()
class AuthenticateSponsorService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const sponsor = await this.sponsorRepository.findByEmail(email);

    if (!sponsor) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      sponsor.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ who: 'sponsor' }, secret, {
      subject: sponsor.id,
      expiresIn,
    });

    return {
      sponsor,
      token,
    };
  }
}

export default AuthenticateSponsorService;
