import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateAdminService from '@modules/administrators/services/AuthenticateAdminService';

import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const authenticatedService = container.resolve(AuthenticateAdminService);

    const admin = await authenticatedService.execute(data);

    return response.json(classToClass(admin));
  }
}
