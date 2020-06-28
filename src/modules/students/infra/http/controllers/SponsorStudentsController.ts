import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindBySponsorService from '@modules/students/services/FindBySponsorService';

import { classToClass } from 'class-transformer';

export default class SponsorStudentsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const sponsor_id = request.sponsor.id;

    const findSponsorStudents = container.resolve(FindBySponsorService);

    const students = await findSponsorStudents.execute(sponsor_id);

    return response.json(classToClass(students));
  }
}
