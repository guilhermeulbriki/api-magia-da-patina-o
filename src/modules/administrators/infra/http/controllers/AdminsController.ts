import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAdminService from '@modules/administrators/services/CreateAdminService';

import { classToClass } from 'class-transformer';

export default class AdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { acessCode } = request.query;

    const createAdmin = container.resolve(CreateAdminService);

    const formatedData = {
      data,
      acessCode: String(acessCode),
    };

    const admin = await createAdmin.execute(formatedData);

    return response.json(classToClass(admin));
  }
}
