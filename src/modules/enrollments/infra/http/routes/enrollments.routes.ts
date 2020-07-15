import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import EnrollmentsController from '../controllers/EnrollmentsController';

const enrollmentsRouter = Router();
const enrollmentsController = new EnrollmentsController();

enrollmentsRouter.use(checkAuthenticated);

enrollmentsRouter.get('/:id', enrollmentsController.get);
enrollmentsRouter.get('/', enrollmentsController.show);
enrollmentsRouter.post('/', enrollmentsController.create);
enrollmentsRouter.put('/', enrollmentsController.update);
enrollmentsRouter.delete('/:student_id', enrollmentsController.delete);

export default enrollmentsRouter;
