import { Router } from 'express';

import ensureAuthentication from '@modules/sponsors/infra/http/middlewares/ensureAuthenticated';
import StudentsController from '../controllers/StudentsController';

const studentRouter = Router();
const studentController = new StudentsController();

studentRouter.use(ensureAuthentication);

studentRouter.get('/', studentController.list);
studentRouter.get('/profile/', studentController.show);
studentRouter.post('/', studentController.create);
studentRouter.put('/profile/', studentController.update);
studentRouter.delete('/', studentController.delete);

export default studentRouter;
