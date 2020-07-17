import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(checkAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
profileRouter.delete('/', profileController.delete);

export default profileRouter;
