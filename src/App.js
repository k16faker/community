import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

import RootPage from './pages/RootPage';

import './App.css';
import BoardListPage from './pages/BoardListPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';
import DetailPage from './pages/DetailPage';
import ModifyPage from './pages/ModifyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootPage />,
      children: [
        {
          path: '/',
          element:<MainPage />
        },
        {
          path:'login',
          element:<LoginPage />
        },
        {
          path:'signup',
          element:<SignupPage />
        },
        {
          path: 'board',
          element: <Outlet />,
          children: [
            {
              path: 'writing',
              element: <WritingPage />
            },
            {
              path:'list',
              element: <BoardListPage />,
            },
            {
              path: 'detail',
              element: <DetailPage />
            },
            {
              path:'modify',
              element: <ModifyPage />
            }
          ]
        },
      ],
    },
  ]);


  return (
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthContextProvider>
  );
}

export default App;
