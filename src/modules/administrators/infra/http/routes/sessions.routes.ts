import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const adminsRouter = Router();
const sessionsController = new SessionController();

adminsRouter.post('/', sessionsController.create);

export default adminsRouter;
