import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import StudentsController from '../controllers/StudentsController';

const studentRouter = Router();
const studentController = new StudentsController();

studentRouter.use(checkAuthenticated);

studentRouter.get('/:skip', studentController.list);
studentRouter.get('/profile/', studentController.show);
studentRouter.post('/', studentController.create);
studentRouter.put('/', studentController.update);
studentRouter.delete('/', studentController.delete);

export default studentRouter;
