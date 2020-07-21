import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListShutdownsService from '@modules/shutdowns/services/ListShutdownsService';
import CreateShutdownService from '@modules/shutdowns/services/CreateShutdownService';

import { classToClass } from 'class-transformer';

export default class ShutdownController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listShutdowns = container.resolve(ListShutdownsService);

    const shutdowns = await listShutdowns.execute();

    return response.json(classToClass(shutdowns));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createShutdown = container.resolve(CreateShutdownService);

    const shutdown = await createShutdown.execute(data);

    return response.json(classToClass(shutdown));
  }
}
