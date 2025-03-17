import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Movies from './pages/Movies/Movies'
import AddUpdateMovie from './pages/AddUpdateMovie/AddUpdateMovie'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {

  const ProtectedRoute = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    if(!currentUser) {
      return <NavLink to='/' />
    }
    return children;
  }
  return (
    <>
      <Header></Header>
      <main id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/create" element={<ProtectedRoute>
            <AddUpdateMovie />
          </ProtectedRoute>} />
            <Route path="/movies/:id/edit" element={<ProtectedRoute>
            <AddUpdateMovie />
          </ProtectedRoute>} />
        </Routes>
      </main>
        
      <Footer></Footer>
    </>
  )
}

export default App
