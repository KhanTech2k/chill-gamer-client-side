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
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ErrorPage from './Components/ErrorPage';
import UpcomingGames from './Components/upcomingGames';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://chill-gamer-server-jet.vercel.app/review')
      },
      {
        path: '/allReviews',
        element: <AllReviews></AllReviews>,
        loader: () => fetch('https://chill-gamer-server-jet.vercel.app/review')
      },
      {
        path: '/allReviews/reviewDetails/:id',
        element: <PrivateRoute><ReviewDetails></ReviewDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://chill-gamer-server-jet.vercel.app/review/${params.id}`)
      },
      {
        path: '/addReview',
        element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
      },
      {
        path: '/myreviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
        loader: () => fetch('https://chill-gamer-server-jet.vercel.app/review')
      },
      {
        path: '/myreviews/updateReview/:id',
        element: <PrivateRoute><UpdateReview></UpdateReview></PrivateRoute>,
        loader: ({ params }) => fetch(`https://chill-gamer-server-jet.vercel.app/review/${params.id}`)
      },
      {
        path: '/watchlist',
        element: <PrivateRoute><GameWatchlist></GameWatchlist></PrivateRoute>,
        loader: () => fetch('https://chill-gamer-server-jet.vercel.app/watchlist')
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
