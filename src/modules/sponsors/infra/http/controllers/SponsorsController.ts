import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSponsorsService from '@modules/sponsors/services/ListSponsorsService';
import CreateSponsorService from '@modules/sponsors/services/CreateSponsorService';

import { classToClass } from 'class-transformer';

export default class SponsorController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const { page } = request.params;

    const listSponsors = container.resolve(ListSponsorsService);

    const sponsors = await listSponsors.execute({
      name: String(name),
      skip: Number(page),
    });

    return response.json(classToClass(sponsors));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSponsor = container.resolve(CreateSponsorService);

    const sponsor = await createSponsor.execute(data);

    return response.json(classToClass(sponsor));
  }
}
