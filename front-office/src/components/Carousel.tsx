import React from "react";
import { Carousel } from "@material-tailwind/react";

export default function CarouselTransition() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div style={{ position: 'absolute', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <img
          src="https://free-icon.org/material/01-illustration/0001-download-image-m.png"
          alt="overlay image"
          style={{ maxWidth: '700px', maxHeight: '500px', width:'80%',height:'90%',marginLeft:'4rem'}}
        />
      </div>
      <Carousel transition={{ duration: 1.5 }} className="rounded-xl" style={{ maxWidth: '700px', maxHeight: '500px' }}>
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
		);
	}