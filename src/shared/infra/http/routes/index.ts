import { Router } from 'express';

import sponsorsRouter from '@modules/sponsors/infra/http/routes/sponsors.routes';

const routes = Router();

routes.use('/sponsors', sponsorsRouter);

export default routes;
