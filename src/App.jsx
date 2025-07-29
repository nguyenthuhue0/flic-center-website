import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumb from './components/Breadcrumb';


function App() {

  return (
    <>
      <Header />
      <Breadcrumb/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App


