// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper styles
import "swiper/css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

export default function SwiperProject({ images }) {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    console.log("Received images:", images);

    const loadImages = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image.metadata.content.url;
        img.onload = () => {
          setLoadedImages((prev) => [...prev, { ...image, width: img.width }]);
        };
      });
    };
    loadImages();
  }, [images]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
  };

  return (
    <>
      <div className="slider-container md:block hidden">
        <Slider {...settings}>
          {loadedImages.length &&
            loadedImages.map((image, idx) => (
              <div
                className="outline-none"
                key={idx}
                style={{ width: `${image.width}` }}
              >
                <img
                  srcSet={image.metadata.content.url}
                  alt={image.title}
                  className="w-[98%] object-cover h-[500px] rounded-md"
                />
              </div>
            ))}
        </Slider>
      </div>
      <div className="slider-container block lg:hidden">
        <Slider>
          {loadedImages.length &&
            loadedImages.map((image, idx) => (
              <div
                className="outline-none px-2"
                key={idx}
                style={{ width: `${image.width}` }}
              >
                <img
                  srcSet={image.metadata.content.url}
                  alt={image.title}
                  className="w-full h-[500px] object-cover rounded-md"
                />
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}
