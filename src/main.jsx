import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import Layout from './Layout'
import Home from './components/Home/Home'
import Signup from './components/Auth/SignUp/Signup'
import Login from './components/Auth/Login/Login'
import Recipe from './components/Recipe/Recipe'
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import { AuthContextProvider } from './context/AuthContext'
import About from './components/About/About'
import MyRecipe from './components/MyRecipe/MyRecipe'
import MyCollections from './components/MyCollections/MyCollections'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='recipes' element={<Recipe />} />
        <Route path='recipes/:id' element={<RecipeDetail />} />
        <Route path='about' element={<About />} />
        <Route path='my-recipes' element={<MyRecipe />} />
        <Route path='my-collections' element={<MyCollections />}/>
    </Route>
  )
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthContextProvider>
    <RouterProvider router={router} />
   </AuthContextProvider>
  </StrictMode>,
)
