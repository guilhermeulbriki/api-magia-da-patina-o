import { Router } from 'express';

import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();
const adminController = new AdminsController();

adminsRouter.post('/', adminController.create);

export default adminsRouter;
