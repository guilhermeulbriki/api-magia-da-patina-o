import { Router } from 'express';

import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import studentsBySponsorRouter from '@modules/students/infra/http/routes/studentsBySponsor.routes';

import sponsorsRouter from '@modules/sponsors/infra/http/routes/sponsors.routes';
import sponsorProfileRouter from '@modules/sponsors/infra/http/routes/profile.routes';
import sponsorSessionsRouter from '@modules/sponsors/infra/http/routes/sessions.routes';

import adminsRouter from '@modules/administrators/infra/http/routes/admins.routes';
import adminProfileRouter from '@modules/administrators/infra/http/routes/profile.routes';
import adminSessionsRouter from '@modules/administrators/infra/http/routes/sessions.routes';

import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';

import schedulesRouter from '@modules/schedules/infra/http/routes/schedules.routes';

import enrollmentsRouter from '@modules/enrollments/infra/http/routes/enrollments.routes';

import shutdownRouter from '@modules/shutdowns/infra/http/routes/shutdown.routes';

import competitionsRouter from '@modules/competitions/infra/http/routes/competitions.routes';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/students/by-sponsor', studentsBySponsorRouter);

routes.use('/sponsors', sponsorsRouter);
routes.use('/sessions/sponsor', sponsorSessionsRouter);
routes.use('/sponsors/profile', sponsorProfileRouter);

routes.use('/admins', adminsRouter);
routes.use('/admins/profile', adminProfileRouter);
routes.use('/sessions/admin', adminSessionsRouter);

routes.use('/groups', groupsRouter);

routes.use('/schedules', schedulesRouter);

routes.use('/enrollments', enrollmentsRouter);

routes.use('/shutdowns', shutdownRouter);

routes.use('/competitions', competitionsRouter);

export default routes;
