import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/sponsors/services/UpdateProfileService';
import FindByIdService from '@modules/sponsors/services/FindByIdService';

import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const sponsor_id = request.sponsor.id;

    const findById = container.resolve(FindByIdService);

    const sponsor = await findById.execute(sponsor_id);

    return response.json(classToClass(sponsor));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const sponsor_id = request.sponsor.id;

    const data = request.body;

    const sponsor = {
      sponsor_id,
      ...data,
    };

    const updateSponsor = container.resolve(UpdateProfileService);

    const updatedSponsor = await updateSponsor.execute(sponsor);

    return response.json(classToClass(updatedSponsor));
  }
}
