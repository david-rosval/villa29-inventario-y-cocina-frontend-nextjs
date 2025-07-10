"use client";
import Arrow from "./Arrow";
import Navbar from "./Navbar";

const Hero = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                role="video"            
                muted
                autoPlay
                className="absolute top-0 left-0 w-full h-screen object-cover"
                loop
                playsInline
                src="/video_primera_section.mp4" 
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <h1 className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                <p className="text-white font-bold drop-shadow-2xl bowlby-one-regular link-super-large -mb-4">
                    EL HOGAR DE LA BUENA
                </p>
                <p className="text-white font-bold drop-shadow-2xl bowlby-one-regular link-super-large -mb-4">
                    MÚSICA, COCTELES Y
                </p>
                <p className="text-white font-bold drop-shadow-2xl bowlby-one-regular link-super-large mb-0">
                    BUENOS MOMENTOS EN LIMA
                </p>
            </h1>
            <Arrow/>
            <div className="absolute w-full z-100 bg-black top-[85%]">
                <Navbar/>
            </div>
        </div>
        
    )
}

export default Hero