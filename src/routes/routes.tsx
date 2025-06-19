import MainLayout from '../layouts/MainLayout';
import UserLayout from '../layouts/UserLayout';
import UsersPage from '../pages/UsersPage';
import UserDetailsPage from '../pages/UserDetailsPage';
import TasksPage from '../pages/TasksPage';

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