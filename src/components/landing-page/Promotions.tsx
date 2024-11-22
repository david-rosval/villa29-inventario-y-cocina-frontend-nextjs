"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Promotions = () => {
    return (
        <div className="w-full flex flex-col items-center py-12 px-4 bg-black overflow-x-hidden" id='promociones'>
            {/* titulo */}
            <h2 className="text-[#B57EFF] bowlby-one-regular font-bold text-4xl md:text-5xl text-center mb-8">
                PROMOCIONES
            </h2>

            {/* container principal*/}
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg gap-8">
                
                {/* img promocion */}
                <motion.div
                    className="w-11/12 sm:w-full md:w-[500px] overflow-hidden rounded-lg"
                    initial={{ opacity: 0, x: -100 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }} 
                    whileHover={{ scale: 1.10}}
                >
                    <Image
                        src="/promocion.png"
                        alt="Promoción Alitas"
                        width={500}
                        height={350}
                        className="object-cover w-full h-full"
                    />
                </motion.div>

                {/* container card */}
                <motion.div
                    className="w-10/12 md:w-[500px] sm:w-4/5 bg-[#B57EFF] p-12 items-center justify-center rounded-lg min-h-[400px] sm:min-h-[350px] flex flex-col mb-8 md:ml-8 md:mb-0 text-center"
                    initial={{ opacity: 0, x: 100 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }} 
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)" }}
                >
                    {/* gif */}
                    <div className="mb-4">
                        <Image
                            src="/gif-promotions.gif"
                            alt="Promoción Gif"
                            width={50}
                            height={20}
                            className="object-contain"
                        />
                    </div>

                    {/* titulo */}
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 bowlby-one-regular text-black">
                        TODOS LOS 15 Y FINES DE MES
                    </h3>

                    {/* text */}
                    <p className="font-inter text-base sm:text-lg leading-relaxed text-black">
                        Disfruta de 6 alitas a solo 15 soles, en el sabor que prefieras.
                        ¡Ven y prueba nuestras alitas bañadas en salsas irresistibles!
                        No te lo pierdas y celebra con nosotros en Villa 29.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Promotions;
