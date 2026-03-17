import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ProjectOne } from './components/pages/ProjectOne';
import { ProjectTwo } from './components/pages/ProjectTwo';
import { ProjectThree } from './components/pages/ProjectThree';

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
