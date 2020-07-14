import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import EnrollmentsController from '../controllers/EnrollmentsController';

const enrollmentsRouter = Router();
const enrollmentsController = new EnrollmentsController();

enrollmentsRouter.use(checkAuthenticated);

enrollmentsRouter.post('/', enrollmentsController.create);

export default enrollmentsRouter;
