import express from 'express';
import { AuthRoutes } from '../modules/user/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
