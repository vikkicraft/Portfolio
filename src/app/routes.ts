import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ProjectOne } from './components/pages/ProjectOne';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'project/1', Component: ProjectOne },
    ],
  },
]);