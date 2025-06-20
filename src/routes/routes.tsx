import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import { UsersPage, UserDetailsPage, TasksPage } from '../pages';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
      {
        path: 'users/:userId',
        element: <UserLayout />,
        children: [
          { index: true, element: <UserDetailsPage /> },
        ],
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
    ],
  },
]

const RoutesComponent = () => useRoutes(routes);
export default RoutesComponent; 