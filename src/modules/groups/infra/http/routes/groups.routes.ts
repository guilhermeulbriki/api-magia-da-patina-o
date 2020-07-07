import { Router } from 'express';

import checkAdminAuthenticated from '@shared/infra/http/middlewares/checkAdminAuthenticated';
import GroupsController from '../controllers/GroupsController';
import ListGroupsController from '../controllers/ListGroupsController';

const groupsRouter = Router();
const groupsController = new GroupsController();
const listGroupsController = new ListGroupsController();

groupsRouter.use(checkAdminAuthenticated);

groupsRouter.get('/:id', groupsController.show);
groupsRouter.get('/', listGroupsController.list);
groupsRouter.post('/', groupsController.create);
groupsRouter.put('/', groupsController.update);
groupsRouter.delete('/:id', groupsController.delete);

export default groupsRouter;
