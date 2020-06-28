import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSponsorsService from '@modules/sponsors/services/ListSponsorsService';
import CreateSponsorService from '@modules/sponsors/services/CreateSponsorService';
import DeleteSponsorService from '@modules/sponsors/services/DeleteSponsorService';

import { classToClass } from 'class-transformer';

export default class SponsorController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listSponsors = container.resolve(ListSponsorsService);

    const sponsors = await listSponsors.execute();

    return response.json(classToClass(sponsors));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSponsor = container.resolve(CreateSponsorService);

    const sponsor = await createSponsor.execute(data);

    return response.json(classToClass(sponsor));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteSponsor = container.resolve(DeleteSponsorService);

    await deleteSponsor.execute(String(id));

    return response.status(204).send();
  }
}
