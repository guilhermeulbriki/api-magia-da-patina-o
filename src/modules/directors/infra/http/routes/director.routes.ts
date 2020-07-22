import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import DirectorController from '../controllers/DirectorController';

const directorRouter = Router();
const directorController = new DirectorController();

directorRouter.use(checkAuthenticated);

directorRouter.get('/:id', directorController.show);
directorRouter.get('/', directorController.list);
directorRouter.post('/', directorController.create);
directorRouter.put('/:id', directorController.update);
directorRouter.delete('/:id', directorController.delete);

export default directorRouter;
