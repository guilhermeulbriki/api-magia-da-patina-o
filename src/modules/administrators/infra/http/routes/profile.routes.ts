import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

const adminsRouter = Router();
const adminController = new ProfileController();

adminsRouter.get('/', adminController.show);
adminsRouter.put('/', adminController.update);
adminsRouter.delete('/', adminController.delete);

export default adminsRouter;
