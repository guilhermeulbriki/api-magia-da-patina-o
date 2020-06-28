import { Router } from 'express';

import sponsorsRouter from '@modules/sponsors/infra/http/routes/sponsors.routes';
import profileRouter from '@modules/sponsors/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/sponsors/infra/http/routes/sessions.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import sponsorStudentsRouter from '@modules/students/infra/http/routes/sponsorStudents.routes';

const routes = Router();

routes.use('/sponsors', sponsorsRouter);
routes.use('/sponsors/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/sponsor-students', sponsorStudentsRouter);

export default routes;
