import './Styles/CSS/App.css'
import { Route, Routes } from 'react-router-dom'
import LoginLock from './Guard/LoginLock'
import RecipeChat from './Pages/RecipeChat'
import Home from './Pages/Home'
import MealPlanner from './Pages/MealPlanner'
import AboutUs from './Pages/AboutUs'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginLock needLoggedIn={true}><Home /></LoginLock>} />
        <Route path='/recipechat' element={<LoginLock needLoggedIn={true}><RecipeChat /></LoginLock>} />
        <Route path='/meal-planner' element={<LoginLock needLoggedIn={true}><MealPlanner /></LoginLock>} />
        <Route path='/about-us' element={<LoginLock needLoggedIn={true}><AboutUs /></LoginLock>} />
      </Routes>
    </>
  )
}

export default App
