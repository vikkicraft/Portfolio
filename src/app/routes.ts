import { createBrowserRouter } from 'react-router';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { ProjectOne } from './pages/ProjectOne';
import { ProjectTwo } from './pages/ProjectTwo';
import { ProjectThree } from './pages/ProjectThree';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'project/1', Component: ProjectOne },
      { path: 'project/2', Component: ProjectTwo },
      { path: 'project/3', Component: ProjectThree },
    ],
  },
]);