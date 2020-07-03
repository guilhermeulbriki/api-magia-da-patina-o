import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroupService from '@modules/groups/services/CreateGroupService';
import ListGroupsService from '@modules/groups/services/ListGroupsService';
import ShowGroupService from '@modules/groups/services/ShowGroupService';
import DeleteGroupService from '@modules/groups/services/DeleteGroupService';
import UpdateGroupService from '@modules/groups/services/UpdateGroupService';

import { classToClass } from 'class-transformer';

export default class GroupsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showGroup = container.resolve(ShowGroupService);

    const group = await showGroup.execute(id);

    return response.json(classToClass(group));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { city } = request.query;

    const listGroups = container.resolve(ListGroupsService);

    const groups = await listGroups.execute(String(city));

    return response.json(classToClass(groups));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute(data);

    return response.json(classToClass(group));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.query;

    const updateGroup = container.resolve(UpdateGroupService);

    const formatedGroup = {
      ...data,
      id,
    };

    const group = await updateGroup.execute(formatedGroup);

    return response.json(classToClass(group));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteGroup = container.resolve(DeleteGroupService);

    await deleteGroup.execute(id);

    return response.status(204).send();
  }
}
