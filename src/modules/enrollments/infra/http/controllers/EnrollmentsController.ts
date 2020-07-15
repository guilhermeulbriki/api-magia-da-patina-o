import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowEnrollmentService from '@modules/enrollments/services/ShowEnrollmentService';
import ListEnrollmentsService from '@modules/enrollments/services/ListEnrollmentsService';
import CreateEnrollmentService from '@modules/enrollments/services/CreateEnrollmentService';
import UpdateEnrollmentService from '@modules/enrollments/services/UpdateEnrollmentService';

import { classToClass } from 'class-transformer';

export default class EnrollmentsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEnrollment = container.resolve(ShowEnrollmentService);

    const enrollment = await showEnrollment.execute(id);

    return response.json(classToClass(enrollment));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listEnrollments = container.resolve(ListEnrollmentsService);

    const enrollments = await listEnrollments.execute();

    return response.json(classToClass(enrollments));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { student_id } = request.query;

    const createEnrollment = container.resolve(CreateEnrollmentService);

    const enrollment = await createEnrollment.execute(String(student_id));

    return response.json(classToClass(enrollment));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { student_id } = request.query;

    const updateEnrollment = container.resolve(UpdateEnrollmentService);

    const enrollment = await updateEnrollment.execute(String(student_id));

    return response.json(classToClass(enrollment));
  }
}
