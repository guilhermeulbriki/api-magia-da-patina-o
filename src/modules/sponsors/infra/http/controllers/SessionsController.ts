import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateSponsorService from '@modules/sponsors/services/AuthenticateSponsorService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateSponsor = container.resolve(AuthenticateSponsorService);

    const { sponsor, token } = await authenticateSponsor.execute({
      email,
      password,
    });

    return response.json({ sponsor: classToClass(sponsor), token });
  }
}
