import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import ProfileController from '../controllers/ProfileController';

const adminsRouter = Router();
const adminController = new ProfileController();

adminsRouter.use(checkAuthenticated);

adminsRouter.get('/', adminController.show);
adminsRouter.put('/', adminController.update);
adminsRouter.delete('/', adminController.delete);

export default adminsRouter;
