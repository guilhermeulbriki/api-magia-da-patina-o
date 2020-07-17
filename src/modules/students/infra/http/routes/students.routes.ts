import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import StudentsController from '../controllers/StudentsController';

const studentRouter = Router();
const studentController = new StudentsController();

studentRouter.use(checkAuthenticated);

studentRouter.get('/:page', studentController.list);
studentRouter.get('/show/:id', studentController.show);
studentRouter.post('/', studentController.create);
studentRouter.put('/', studentController.update);
studentRouter.patch('/', studentController.alterGroup);
studentRouter.delete('/', studentController.delete);

export default studentRouter;
