import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindByIdService from '@modules/students/services/FindByIdService';
import ListStudentsService from '@modules/students/services/ListStudentsService';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import UpdateProfileService from '@modules/students/services/UpdateProfileService';
import DeleteSponsorService from '@modules/students/services/DeleteSponsorService';

import { classToClass } from 'class-transformer';

export default class StudentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const findById = container.resolve(FindByIdService);

    const student = await findById.execute(String(id));

    return response.json(classToClass(student));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { age, group, name } = request.query;

    const listStudents = container.resolve(ListStudentsService);

    const students = await listStudents.execute({
      age: Number(age),
      group: String(group),
      name: String(name),
    });

    return response.json(classToClass(students));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const student_data = request.body;
    const sponsor_id = request.sponsor.id;

    const createStudents = container.resolve(CreateStudentService);

    const student = await createStudents.execute({
      student_data,
      sponsor_id,
    });

    return response.json(classToClass(student));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const student_data = request.body;
    const id = request.query.student_id;

    const updateStudents = container.resolve(UpdateProfileService);

    const student = await updateStudents.execute({
      ...student_data,
      id,
    });

    return response.json(classToClass(student));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteStudent = container.resolve(DeleteSponsorService);

    await deleteStudent.execute(String(id));

    return response.status(204).send();
  }
}
