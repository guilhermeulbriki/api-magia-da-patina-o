import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import SchedulesController from '../controllers/SchedulesController';

const scheduleRouter = Router();
const scheduleController = new SchedulesController();

scheduleRouter.use(checkAuthenticated);

scheduleRouter.get('/:id', scheduleController.show);
scheduleRouter.get('/', scheduleController.list);
scheduleRouter.post('/', scheduleController.create);
scheduleRouter.put('/:id', scheduleController.update);
scheduleRouter.delete('/:id', scheduleController.delete);

export default scheduleRouter;
