import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAdminService from '@modules/administrators/services/ShowAdminService';
import UpdateService from '@modules/administrators/services/UpdateService';
import DeleteAdminService from '@modules/administrators/services/DeleteAdminService';

import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.admin;

    const showAdmin = container.resolve(ShowAdminService);

    const admin = await showAdmin.execute(String(id));

    return response.json(classToClass(admin));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.admin;
    const data = request.body;

    const updateAdmin = container.resolve(UpdateService);

    const admin = {
      ...data,
      id,
    };

    const updatedAdmin = await updateAdmin.execute(admin);

    return response.json(classToClass(updatedAdmin));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.admin;

    const deleteAdmin = container.resolve(DeleteAdminService);

    await deleteAdmin.execute(String(id));

    return response.status(204).send();
  }
}
