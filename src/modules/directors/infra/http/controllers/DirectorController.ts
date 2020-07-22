import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ListDirectorsService from '../../../services/ListDirectorsService';
import ShowDirectorsService from '../../../services/ShowDirectorsService';
import CreateDirectorService from '../../../services/CreateDirectorService';
import UpdateDirectorService from '../../../services/UpdateDirectorService';
import DeleteDirectorService from '../../../services/DeleteDirectorService';

export default class DirectorController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDirector = container.resolve(ShowDirectorsService);

    const director = await showDirector.execute(String(id));

    return response.json(classToClass(director));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const listDirector = container.resolve(ListDirectorsService);

    const director = await listDirector.execute(Number(page));

    return response.json(classToClass(director));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createDirector = container.resolve(CreateDirectorService);

    const director = await createDirector.execute(data);

    return response.json(classToClass(director));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { president, vice, start, end } = request.body;
    const { id } = request.params;

    const updateDirector = container.resolve(UpdateDirectorService);

    const director = await updateDirector.execute({
      id,
      vice,
      start,
      end,
      president,
    });

    return response.json(classToClass(director));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDirector = container.resolve(DeleteDirectorService);

    await deleteDirector.execute(String(id));

    return response.status(204).send();
  }
}
