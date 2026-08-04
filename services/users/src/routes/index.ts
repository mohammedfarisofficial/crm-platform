import { Router } from 'express';

import queryRoutes from './query';
import mutateRoutes from './mutate';

const usersRouter = Router();

usersRouter.use(queryRoutes);
usersRouter.use(mutateRoutes);

export default usersRouter;