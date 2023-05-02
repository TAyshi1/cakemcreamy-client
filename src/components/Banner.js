import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";




function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",


    };

    const images = [
        { id: 1, src: '/banner-img-1.png' },
        { id: 2, src: '/banner-img-1.png' },
        { id: 3, src: '/banner-img-1.png' },
    ];




    return (

        <div>
            <div className="md:block hidden">
                <Slider className="" {...settings}>
                    {images.map((image) => (
                        <div key={image.id} >


                            <div className="w-full h-[450px] relative">
                                <Image fill src={image.src} alt="" />
                                <button className="absolute bottom-12 left-16 font-bold  px-16 py-3 rounded-2xl bg-white text-violet-800">Shop Now</button>

                            </div>

                        </div>
                    ))}
                </Slider>
            </div>


            <div>
                <div className="w-full md:hidden h-[450px] relative">
                    <Image fill src={images[0].src} alt="" />
                    <button className="absolute bottom-12 left-16 font-bold  px-16 py-3 rounded-2xl bg-white text-violet-800">Shop Now</button>

                </div>
            </div>
        </div>







    );
}

export default Banner;
