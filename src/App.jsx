import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'nprogress/nprogress.css';

import './App.css';


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


