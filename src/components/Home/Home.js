import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeImage1 from './home1.jpg';
import homeImage2 from './home2.jpg';
import homeImage3 from './home3.jpg';

function Home() {
  const carouselImages = [homeImage1, homeImage2, homeImage3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,    
    autoplaySpeed: 200,   
  };
  return (
    <div>
      <br />
      <div className="container">
      <div className='row'>
          <Slider {...settings}>
            {carouselImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`carousel-${index + 1}`} style={{ width: 'auto', height: '500px' }}/>
              </div>
            ))}
          </Slider>
          </div>
        </div>
        <div className='container'>
        <h4 style={{textAlign: 'center'}}>
          Welcome to Digital HRMS
        </h4>
        <hr/>
        </div>
      </div>
  );
}

export default Home;
