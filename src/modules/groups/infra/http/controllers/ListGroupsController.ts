import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListGroupsService from '@modules/groups/services/ListGroupsService';

import { classToClass } from 'class-transformer';

export default class ListGroupsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { city } = request.query;

    const listGroups = container.resolve(ListGroupsService);

    const groups = await listGroups.execute(String(city));

    return response.json(classToClass(groups));
  }
}
