import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSponsorService from '@modules/sponsors/services/CreateSponsorService';
import ListSponsorsService from '@modules/sponsors/services/ListSponsorsService';
import UpdateProfileService from '@modules/sponsors/services/UpdateProfileService';
import DeleteSponsorService from '@modules/sponsors/services/DeleteSponsorService';

import { classToClass } from 'class-transformer';

export default class SponsorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSponsor = container.resolve(CreateSponsorService);

    const sponsor = await createSponsor.execute(data);

    return response.json(classToClass(sponsor));
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listSponsors = container.resolve(ListSponsorsService);

    const sponsors = await listSponsors.execute();

    return response.json(classToClass(sponsors));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.query;

    const data = request.body;

    const sponsor = {
      id,
      ...data,
    };

    const updateSponsor = container.resolve(UpdateProfileService);

    const updatedSponsor = await updateSponsor.execute(sponsor);

    return response.json(classToClass(updatedSponsor));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteSponsor = container.resolve(DeleteSponsorService);

    await deleteSponsor.execute(String(id));

    return response.status(204).send();
  }
}
