import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import UsersPage from '../pages/UsersPage';
import UserDetailsPage from '../pages/UserDetailsPage';
import TasksPage from '../pages/TasksPage';
import { useRoutes } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      {
        path: 'users/:userId',
        element: <UserLayout />,
        children: [
          { index: true, element: <UserDetailsPage /> },
        ],
      },
      { path: 'tasks', element: <TasksPage /> },
    ],
  },
]; 

const RoutesComponent = () => useRoutes(routes);
export default RoutesComponent; 