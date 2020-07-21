import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import ShutdownController from '../controllers/ShutdownController';

const shutdownRouter = Router();
const shutdownController = new ShutdownController();

shutdownRouter.use(checkAuthenticated);

shutdownRouter.get('/', shutdownController.list);
shutdownRouter.post('/', shutdownController.create);

export default shutdownRouter;
