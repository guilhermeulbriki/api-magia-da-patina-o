import { Router } from 'express';

import GroupsController from '../controllers/GroupsController';

const groupsRouter = Router();
const groupsController = new GroupsController();

groupsRouter.get('/:id', groupsController.show);
groupsRouter.get('/', groupsController.list);
groupsRouter.post('/', groupsController.create);
groupsRouter.put('/', groupsController.update);
groupsRouter.delete('/:id', groupsController.delete);

export default groupsRouter;
