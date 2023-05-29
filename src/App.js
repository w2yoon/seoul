import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Shapes from './components/Shapes';
import ImageGrid from './components/ImageGrid';
import Kakao from './components/Kakao';
import Thing from './components/Thing.js'
import Footer from './components/Footer.js'
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="place" element={<Place />} />
          <Route path="things" element={<Things />} />
        </Route>
        <Route path="*" element={<div>없는 페이지임</div>} />
      </Routes>
    </div>
  );
}

const MainLayout = () => {
  let location = useLocation();
  
  const getNavbarColor = () => {
    switch (location.pathname) {
      case "/":
        return "white";
      default:
        return "black";
    }
  };

  return (
    <div>
      <Navbar color={getNavbarColor()} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const Home = () => (
  <div>
     <div>
      <Carousel />
      <Shapes />
      <h1 className="text-effect">이런 곳은 어때?</h1>
      <ImageGrid />
      <Footer />
    </div>
  </div>
);

const Place = () => (
  <div style={{ color:'black',
  fontFamily:'hanna_air',
  paddingTop: "80px"}}>
    <h1>어디로 떠나볼까요?</h1>
    <Kakao />
  </div>
);

const Things = () => (
  <div style={{paddingTop: "56px"}}>
    <Thing />
  </div>
);

export default App;
