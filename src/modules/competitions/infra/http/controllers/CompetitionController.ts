import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowCompetitionService from '@modules/competitions/services/ShowCompetitionService';
import ListCompetitionsService from '@modules/competitions/services/ListCompetitionsService';
import CreateCompetitionService from '@modules/competitions/services/CreateCompetitionService';
import UpdateCompetitionService from '@modules/competitions/services/UpdateCompetitionService';
import DeleteCompetitionService from '@modules/competitions/services/DeleteCompetitionService';

import { classToClass } from 'class-transformer';

export default class CompetitionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCompetition = container.resolve(ShowCompetitionService);

    const competition = await showCompetition.execute(String(id));

    return response.json(classToClass(competition));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCompetition = container.resolve(ListCompetitionsService);

    const competition = await listCompetition.execute();

    return response.json(classToClass(competition));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createCompeition = container.resolve(CreateCompetitionService);

    const competition = await createCompeition.execute(data);

    return response.json(classToClass(competition));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { award, category, city, date, name, student_name } = request.body;
    const { id } = request.params;

    const updateCompetition = container.resolve(UpdateCompetitionService);

    const competition = await updateCompetition.execute({
      award,
      category,
      city,
      date,
      id,
      name,
      student_name,
    });

    return response.json(classToClass(competition));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompetition = container.resolve(DeleteCompetitionService);

    await deleteCompetition.execute(String(id));

    return response.status(204).send();
  }
}
