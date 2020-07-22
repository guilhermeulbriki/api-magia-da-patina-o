import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import SpectacleController from '../controllers/SpectacleController';

const spectacleRouter = Router();
const spectacleController = new SpectacleController();

spectacleRouter.use(checkAuthenticated);

spectacleRouter.get('/:id', spectacleController.show);
spectacleRouter.get('/', spectacleController.list);
spectacleRouter.post('/', spectacleController.create);
spectacleRouter.put('/:id', spectacleController.update);
spectacleRouter.delete('/:id', spectacleController.delete);

export default spectacleRouter;
