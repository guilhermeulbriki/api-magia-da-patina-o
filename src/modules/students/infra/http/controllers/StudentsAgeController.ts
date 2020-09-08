import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListStudentsAgesService from '@modules/students/services/ListStudentsAgesService';

import { classToClass } from 'class-transformer';

export default class SponsorStudentsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listStudentsAge = container.resolve(ListStudentsAgesService);

    const students = await listStudentsAge.execute();

    return response.json(classToClass(students));
  }
}
