import { Router } from 'express';

import ListGroupsController from '../controllers/ListGroupsController';

const groupsRouter = Router();
const listGroupsController = new ListGroupsController();

groupsRouter.get('/', listGroupsController.list);

export default groupsRouter;
