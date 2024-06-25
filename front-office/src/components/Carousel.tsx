import React from "react";
import { Carousel } from "@material-tailwind/react";
import Carousel1 from "../assets/Carousel-1.png";  // インポートした画像
import Carousel2 from "../assets/Carousel-2.png";  // インポートした画像
import Carousel3 from "../assets/Carousel-3.png";  // インポートした画像
import Carousel4 from "../assets/Carousel-4.png";  // インポートした画像
import Carousel5 from "../assets/Carousel-5.png";  // インポートした画像
import Carousel6 from "../assets/Carousel-6.png";  // インポートした画像

export default function CarouselTransition() {
  return (
    <div className="flex justify-center items-center">
      <Carousel transition={{ duration: 1.5 }} className="rounded-xl" style={{ maxWidth: '900px', maxHeight: '600px' }}>
        <img
          src={Carousel1}  // インポートした画像を使用
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={Carousel2}  // インポートした画像を使用
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={Carousel3}  // インポートした画像を使用
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <img
          src={Carousel4}  // インポートした画像を使用
          alt="image 4"
          className="h-full w-full object-cover"
        />
        <img
          src={Carousel5}  // インポートした画像を使用
          alt="image 5"
          className="h-full w-full object-cover"
        />
        <img
          src={Carousel6}  // インポートした画像を使用
          alt="image 6"
          className="h-full w-full object-cover"
        />
        
      </Carousel>
    </div>
  );
}
