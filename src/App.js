import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import RootPage from './pages/RootPage';

import './App.css';
import BoardListPage from './pages/BoardListPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';
import DetailPage from './pages/DetailPage';

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
              element: <BoardListPage />,
            },
            {
              path: 'detail',
              element: <DetailPage />
            },
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
