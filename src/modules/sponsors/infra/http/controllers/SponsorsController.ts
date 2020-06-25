import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSponsorService from '@modules/sponsors/services/CreateSponsorService';

export default class SponsorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      born,
      rg,
      cpf,
      phone,
      whatsapp,
      gender,
      type,
      address,
    } = request.body;

    const createSponsor = container.resolve(CreateSponsorService);

    const sponsor = await createSponsor.execute({
      name,
      password,
      email,
      born,
      rg,
      cpf,
      phone,
      whatsapp,
      gender,
      type,
      address,
    });

    return response.json(sponsor);
  }
}
