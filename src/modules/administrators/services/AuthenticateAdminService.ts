import 'reflect-metadata';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/sponsors/providers/HashProvider/models/IHashProvider';

import Admin from '../infra/typeorm/entities/Admin';
import IAdminRepository from '../repositories/IAdminRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  admin: Admin;
  token: string;
}

@injectable()
class AuthenticateSponsorService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      admin.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ who: 'admin' }, secret, {
      subject: admin.id,
      expiresIn,
    });

    return {
      admin,
      token,
    };
  }
}

export default AuthenticateSponsorService;
