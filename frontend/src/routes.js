import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import DashboardView from './views/reports/DashboardView';
import AccountView from './views/account/AccountView';
import CustomerListView from './views/customer/CustomerListView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';

import SettingsView from './views/settings/SettingsView';
import UserListView from './containers/user/UserListView';
import LoginView from './containers/auth/LoginView';
import RegisterView from './containers/auth/RegisterView';
import TodoListView from './containers/todos/TodoListView';

const routes = (auth) => [
  {
    path: 'app',
    element: auth.isAuthenticated ? <DashboardLayout /> : <Navigate to='/login'/>,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'users', element: <UserListView /> },
      { path: 'todos', element: <TodoListView />},
      { path: 'customers', element: <CustomerListView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !auth.isAuthenticated ? <MainLayout /> : <Navigate to='/app/dashboard'/>,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Navigate to="/login" /> },
    ]
  }
];
// const routes =  [
//   {
//     path: 'app',
//     element: <DashboardLayout />,
//     children: [
//       { path: 'account', element: <AccountView /> },
//       { path: 'customers', element: <CustomerListView /> },
//       { path: 'users', element: <UserListView /> },
//       { path: 'dashboard', element: <DashboardView /> },
//       { path: 'products', element: <ProductListView /> },
//       { path: 'settings', element: <SettingsView /> },
//       { path: '*', element: <Navigate to="/404" /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: 'login', element: <LoginView /> },
//       { path: 'register', element: <RegisterView /> },
//       { path: '404', element: <NotFoundView /> },
//       { path: '/', element: <Navigate to="/app/dashboard" /> },
//       { path: '*', element: <Navigate to="/404" /> }
//     ]
//   }
// ];

export default routes;

// https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6