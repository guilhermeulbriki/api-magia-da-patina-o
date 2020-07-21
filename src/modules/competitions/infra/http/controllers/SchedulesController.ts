import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowScheduleService from '@modules/schedules/services/ShowScheduleService';
import ListSchedulesService from '@modules/schedules/services/ListSchedulesService';
import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import UpdateScheduleService from '@modules/schedules/services/UpdateScheduleService';
import DeleteScheduleService from '@modules/schedules/services/DeleteScheduleService';

import { classToClass } from 'class-transformer';

export default class SchedulesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showSchedule = container.resolve(ShowScheduleService);

    const schedule = await showSchedule.execute(String(id));

    return response.json(classToClass(schedule));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listSchedules = container.resolve(ListSchedulesService);

    const schedules = await listSchedules.execute();

    return response.json(classToClass(schedules));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSchedules = container.resolve(CreateScheduleService);

    const schedule = await createSchedules.execute(data);

    return response.json(classToClass(schedule));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { shift, start, finish, day, group_id } = request.body;
    const { id } = request.params;

    const updateSchedule = container.resolve(UpdateScheduleService);

    const schedule = await updateSchedule.execute({
      shift,
      day,
      finish,
      group_id,
      start,
      id,
    });

    return response.json(classToClass(schedule));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSchedule = container.resolve(DeleteScheduleService);

    await deleteSchedule.execute(String(id));

    return response.status(204).send();
  }
}
