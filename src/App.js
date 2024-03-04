import { BrowserRouter, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';


import RootPage from './pages/RootPage';

import './App.css';
import BoardListPage from './pages/BoardListPage';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';

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
          path: 'board',
          element: <Outlet />,
          children: [
            {
              path: 'writing',
              element: <WritingPage />
            },
            {
              path:'list',
              element: <BoardListPage />
            }
          ]
        },
      ],
    },
  ]);


  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
