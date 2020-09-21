import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListSpectaclesService from '../../../services/ListSpectaclesService';
import ShowSpectacleService from '../../../services/ShowSpectacleService';
import CreateSpectacleService from '../../../services/CreateSpectacleService';
import UpdateSpectacleService from '../../../services/UpdateSpectacleService';
import DeleteSpectalceService from '../../../services/DeleteSpectalceService';

export default class SchedulesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSpectacle = container.resolve(ShowSpectacleService);

    const spectacle = await showSpectacle.execute(String(id));

    return response.json(classToClass(spectacle));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { order, page } = request.query;

    const listSpectacle = container.resolve(ListSpectaclesService);

    const spectacle = await listSpectacle.execute({
      order: String(order),
      skip: Number(page),
    });

    return response.json(classToClass(spectacle));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSpectacle = container.resolve(CreateSpectacleService);

    const spectacle = await createSpectacle.execute(data);

    return response.json(classToClass(spectacle));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params;

    const updateSpectacle = container.resolve(UpdateSpectacleService);

    const spectacle = await updateSpectacle.execute({
      id,
      ...data,
    });

    return response.json(classToClass(spectacle));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSpectacle = container.resolve(DeleteSpectalceService);

    await deleteSpectacle.execute(String(id));

    return response.status(204).send();
  }
}
