import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSponsorService from '@modules/sponsors/services/CreateSponsorService';
import ListSponsorsService from '@modules/sponsors/services/ListSponsorsService';

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

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listSponsors = container.resolve(ListSponsorsService);

    const sponsors = await listSponsors.execute();

    return response.json(sponsors);
  }
}
