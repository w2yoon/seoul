import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css'
import './style.css'

const Carousel = () => {
  const images = ['/img/seoul1.jpg', '/img/seoul2.jpg', '/img/seoul3.jpg', '/img/seoul4.jpg'];
  
  const settings = {
    slide: 'div',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRef = (ref) => {
    const scrollPosition = ref.current.offsetTop + 150;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    scrollToRef(scrollRef);
  };

  return (
    <div className="carousel">
        <Slider { ...settings }>
          <div style={{ position: 'relative' }}>
            <img 
              className="carousel-image" 
              src={process.env.PUBLIC_URL + images[activeIndex]}
            />
            <div style={{ 
              fontSize: '78px',
              position: 'absolute',
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
             }}>
              <p>서울의 모든 것</p>
              <p>여기서 쉽고 간편하게</p>
            </div>
          </div>
        </Slider>
        <button className="scroll-button" onClick={handleClick} ref={scrollRef}>
          <span className="arrows"></span>
        </button>
    </div>
  );
};

export default Carousel;
