import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';


import RootPage from './pages/RootPage';

import './App.css';
import BoardPage from './pages/BoardPage';
import MainPage from './pages/MainPage';

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
          path:':topic',
          element: <BoardPage />
        },
        
      ],
    },
  ]);


  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
