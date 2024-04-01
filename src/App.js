import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import RootPage from './pages/RootPage';

import './App.css';
import BoardListPage from './pages/BoardListPage';
import MainPage from './pages/MainPage';
import WritingPage from './pages/WritingPage';
import DetailPage from './pages/DetailPage';
import Modify from './components/board/Modify';
import ModifyPage from './pages/ModifyPage';

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
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
