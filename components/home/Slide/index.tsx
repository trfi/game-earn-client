import Slider from "react-slick";

export default function SlideHome() {
  const settings = {
    centerMode: true,
    centerPadding: '120px',
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          centerMode: true,
          centerPadding: '150px',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
        }
      }
    ]
  };
  return (
    <Slider {...settings} className="single-item">
      <div>
        <img src="/images/slides/slide1.jpg" />
      </div>
      <div>
        <img src="/images/slides/slide2.jpg" />
      </div>
      <div>
        <img src="/images/slides/slide3.jpg" />
      </div>
      <div>
        <img src="/images/slides/slide4.jpg" />
      </div>
    </Slider>
  );
}