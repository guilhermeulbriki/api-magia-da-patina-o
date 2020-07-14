import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEnrollmentService from '@modules/enrollments/services/CreateEnrollmentService';

import { classToClass } from 'class-transformer';

export default class EnrollmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { student_id } = request.query;

    const createEnrollment = container.resolve(CreateEnrollmentService);

    const enrollment = await createEnrollment.execute(String(student_id));

    return response.json(classToClass(enrollment));
  }
}
