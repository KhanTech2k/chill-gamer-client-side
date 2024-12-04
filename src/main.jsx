import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Providers/AuthProvider';
import NavBar from './Components/NavBar';
import HomeLayout from './Layouts/HomeLayouts';
import AllReviews from './Components/AllReviews';
import MyReviews from './Components/MyReviews';
import GameWatchlist from './Components/GameWatchlist';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import AddReview from './Components/AddReview';
import UpdateReview from './Components/UpdateReview';
import ReviewDetails from './Components/ReviewDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/review')
      },
      {
        path: '/allReviews',
        element: <AllReviews></AllReviews>,
        loader:()=>fetch('http://localhost:5000/review')
      },
      {
        path: '/allReviews/reviewDetails/:id',
        element: <ReviewDetails></ReviewDetails>,
        loader: ({params})=>fetch(`http://localhost:5000/review/${params.id}`)
      },
      {
        path: '/addReview',
        element: <AddReview></AddReview>
      },
      {
        path: '/myreviews',
        element: <MyReviews></MyReviews>,
        loader: () => fetch('http://localhost:5000/review')
      },
      {
        path: '/myreviews/updateReview/:id',
        element: <UpdateReview></UpdateReview>,
        loader: ({params})=>fetch(`http://localhost:5000/review/${params.id}`)
      },
      {
        path: '/watchlist',
        element: <GameWatchlist></GameWatchlist>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
