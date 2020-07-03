import { Router } from 'express';

import sponsorsRouter from '@modules/sponsors/infra/http/routes/sponsors.routes';
import sponsorProfileRouter from '@modules/sponsors/infra/http/routes/profile.routes';
import deleteSponsorRouter from '@modules/sponsors/infra/http/routes/deleteSponsor.routes';
import sponsorSessionsRouter from '@modules/sponsors/infra/http/routes/sessions.routes';
import adminsRouter from '@modules/administrators/infra/http/routes/admins.routes';
import adminProfileRouter from '@modules/administrators/infra/http/routes/profile.routes';
import adminSessionsRouter from '@modules/administrators/infra/http/routes/sessions.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import sponsorStudentsRouter from '@modules/students/infra/http/routes/sponsorStudents.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';

const routes = Router();

routes.use('/sponsors', sponsorsRouter);
routes.use('/admins', adminsRouter);
routes.use('/admins/profile', adminProfileRouter);
routes.use('/sponsors/profile', sponsorProfileRouter);
routes.use('/sponsors/profile', deleteSponsorRouter);
routes.use('/sessions/sponsor', sponsorSessionsRouter);
routes.use('/sessions/admin', adminSessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/sponsor-students', sponsorStudentsRouter);
routes.use('/groups', groupsRouter);

export default routes;
