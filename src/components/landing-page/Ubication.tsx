"use client"

import React from 'react';
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Ubication = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-3.5 bg-black overflow-x-hidden" id='ubicacion'>
            {/* titulo */}
            <h2 className="text-white bowlby-one-regular text-center link-super-large font-bold mb-8">UBÍCANOS</h2>

            {/* container de la card */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8">
                
                {/* lado izquierdo */}
                <motion.div
                    className="bg-[#CFFF04] p-12 items-center justify-center rounded-lg w-10/12 md:w-[500px] sm:w-4/5 min-h-[400px] sm:min-h-[350px] flex flex-col mb-8 md:mr-8 md:mb-0 text-center"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 1 }} 
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)" }}
                >
                    {/* info de la localizacion */}
                    <div className="flex flex-col items-center mb-4 sm:mb-8">
                        <FaMapMarkerAlt className="text-[#1E1E1E] sm:text-5xl text-4xl mb-4 animate-soft-bounce" />
                        <h3 className="text-[#1E1E1E] font-bold text-xl sm:text-2xl bowlby-one-regular">UBICACIÓN</h3>
                        <p className="text-[#1E1E1E] text-base sm:text-lg text-center mt-2 font-inter">Sector 3 Grupo 29 Manzana F Lote 3<br />Villa el Salvador</p>
                    </div>

                    <div className="flex flex-col items-center sm:mt-2">
                        <FaRegCalendarAlt className="text-[#1E1E1E] sm:text-5xl text-4xl mb-4 mt-8 animate-soft-bounce" />
                        <h3 className="text-[#1E1E1E] font-bold text-xl sm:text-2xl bowlby-one-regular">HORARIO</h3>
                        <p className="text-[#1E1E1E] text-base sm:text-lg text-center mt-2 font-inter">Lun, Mie, Jue, Vie, Sab, Dom</p>
                        <p className="text-[#1E1E1E] text-base sm:text-lg text-center font-inter">7:00 PM A 11:00 PM</p>
                    </div>
                </motion.div>

                {/* maps, lado derecho */}
                <motion.div
                    className="w-11/12 sm:w-full md:w-[500px] sm:h-[500px] h-[300px]"
                    initial={{ opacity: 0, x: 100 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 1 }} 
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)" }}
                >
                    <iframe
                        title="Ubicación Villa 29"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1949.6546436771227!2d-76.93998178877996!3d-12.22732528967385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105bb19c9df1a9f%3A0x6012235930662eed!2sVilla%2029%20RestoBar!5e0!3m2!1ses-419!2spe!4v1730786903077!5m2!1ses-419!2spe"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        className="rounded-lg"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
}

export default Ubication;
