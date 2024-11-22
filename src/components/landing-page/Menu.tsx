"use client";

import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Menu: React.FC = () => {
    
    const images = [
        '/pag-1.png', // Portada
        '/pag-2.png', // Pagina 1
        '/pag-3.png', // Pagina 2
        '/pag-4.png', // Pagina 3
        '/pag-5.png', // Pagina 4
        '/pag-6.png', // Pagina 5
        '/pag-7.png', // Pagina 6
        '/pag-8.png', // Contraportada
    ];

    const [, setCurrentPage] = useState(0);
    const flipBookRef = useRef<any>(null);

    const handleFlip = (index: number) => {
        setCurrentPage(index);
    };

    const handleNextPage = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const handlePrevPage = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };

    return (
        <motion.div
            className="relative flex mb-36 md:mb-4 flex-col py-16 items-center bg-black"
            id='carta'
            initial={{ opacity: 0, y: -100 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
        >
            <h1 className="link-super-large font-bold text-[#CFFF04] md:mb-8 bowlby-one-regular">CARTA</h1>

            {/* fondo alrededor del flipbook */}
            <div className="blur-background" />
            
            <HTMLFlipBook
                width={260}
                height={530}
                ref={flipBookRef}
                className="flipbook -mb-80 md:mb-4 overflow-hidden"
                style={{ transition: 'margin 0.3s', position: 'relative' }}
                maxWidth={600}
                maxHeight={800}
                showCover={true}
                onFlip={(e) => handleFlip(e.data)}
            >
                {/* portada del flipbook */}
                <div className="demoPage">
                    <img
                        className='mb-72'
                        src="/pag-1.png"
                        alt="Cover"
                        style={{ width: '100%', height: '100%' }}
                        onError={(e) => {
                            e.currentTarget.src = '/pag-1.png';
                        }}
                    />
                </div>

                {/* paginas del flipbook */}
                {images.slice(1, -1).map((image, index) => (
                    <div className="demoPage" key={index}>
                        <img
                            className='mb-72'
                            src={image}
                            alt={`Page ${index + 2}`}
                            style={{ width: '100%', height: '100%' }}
                            onError={(e) => {
                                e.currentTarget.src = '/pag-1.png';
                            }}
                            onLoad={() => handleFlip(index + 1)}
                        />
                    </div>
                ))}

                {/* contraporatada */}
                <div className="demoPage">
                    <img
                        className='mb-72'
                        src="/pag-8.png"
                        alt="Back Cover"
                        style={{ width: '100%', height: '100%' }}
                        onError={(e) => {
                            e.currentTarget.src = '/pag-1.png';
                        }}
                    />
                </div>
            </HTMLFlipBook>

            {/* controles de navegacion */}
            <div className="navigation-container">
                <button 
                    onClick={handlePrevPage} 
                    className="navigation-button navigation-button-left bounce-animation bg-white hover:bg-white"
                    aria-label="Página anterior"
                >
                    <FaArrowLeft className='text-black'/>
                </button>
                <button 
                    onClick={handleNextPage} 
                    className="navigation-button navigation-button-right bounce-animation bg-white hover:bg-white"
                    aria-label="Página siguiente"
                >
                    <FaArrowRight className='text-black'/>
                </button>
            </div>

            <div className="h-4" />
        </motion.div>
    );
};

export default Menu;
