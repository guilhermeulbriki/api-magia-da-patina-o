import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroupService from '@modules/groups/services/CreateGroupService';

import { classToClass } from 'class-transformer';

export default class GroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute(data);

    return response.json(classToClass(group));
  }
}
