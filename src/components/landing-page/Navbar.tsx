"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";
import BlobButton from "./BlobButton";
import Image from "next/image";

const navLinks = [
    { title: "Nosotros", path: "#nosotros" },
    { title: "Más Pedidos", path: "#mas-pedidos" },
    { title: "Promociones", path: "#promociones" },
    { title: "Ubícanos", path: "#ubicacion" },
    { title: "Carta", path: "#carta" },
    { title: "Login", path: "/auth/login" },
];

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY] = useState(0);

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    const menuVariants = {
        open: {
            x: 0,
            transition: {
                stiffness: 20,
                damping: 15,
            },
        },
        closed: {
            x: "-100%",
            transition: {
                stiffness: 20,
                damping: 15,
            },
        },
    };

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined" && window.innerWidth <= 768) { 
                const currentScrollY = window.scrollY;

                if (currentScrollY === 0) {
                    setShowNavbar(true);
                } else {
                    setShowNavbar(false);
                }
            } else {
                setShowNavbar(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`relative w-full bowlby-one-regular z-30 bg-black md:bg-transparent transition-all duration-300 ${showNavbar ? 'opacity-100' : 'opacity-0'}`}>
            {/* navbar en dispositivos moviles */}
            <div className={`md:hidden flex items-center justify-between px-4 py-2 bg-transparent z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="md:hidden flex-1 text-center">
                    <Image 
                      priority
                      src="/villa29-logo.png" 
                      alt="Logo"
                      height={96}
                      width={96}
                    />
                </div>
                
                <div onClick={toggleNav} className="text-white cursor-pointer z-50 absolute top-8 right-4">
                    {nav ? <AiOutlineClose size={35} /> : <AiOutlineMenu size={35} />}
                </div>
            </div>

            {/* enlaces de navegacion en dispositivos de escritorio */}
            <div className="hidden md:flex justify-center items-center px-4 py-2">
                <div className="flex-[0.2] text-center">
                    
                    <Image 
                      priority
                      src="/villa29-logo.png" 
                      alt="Logo"
                      height={96}
                      width={96}
                      className="md:h-16 md:w-16 mx-auto"
                    />
                </div>

                <div className="flex items-center flex-1 justify-end">
                    <ul className="flex flex-row justify-center p-4 space-x-24 pr-12">
                        {navLinks.map((link, index) => (
                            <li key={index} className="flex items-center">
                                {link.title === "Login" ? (
                                    <div className="relative">
                                        <Link href={link.path}>
                                            <BlobButton>
                                                Login
                                            </BlobButton>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href={link.path}>
                                        <p className="text-white bowlby-one-regular hover:text-[#A711D0] transition-colors duration-300">{link.title}</p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* menu movil */}
            <motion.div
                initial={false}
                animate={nav ? 'open' : 'closed'}
                variants={menuVariants}
                className="md:hidden fixed left-0 top-0 w-full h-full z-40 bg-black flex flex-col items-center text-white"
            >
                <ul className="text-4xl mt-32 mb-8 text-center space-y-2">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            {link.title === "Login" ? (
                                <div className="relative">
                                    <Link href={link.path} className="bowlby-one-regular link-large hover:text-[#A711D0] transition-colors duration-300 underline font-black">
                                        {link.title}    
                                    </Link>
                                </div>
                            ) : (
                                <Link href={link.path} onClick={closeNav} className="bowlby-one-regular link-large hover:text-[#A711D0] transition-colors duration-300">
                                    <p className="text-white bowlby-one-regular hover:text-[#A711D0] transition-colors duration-300">{link.title}</p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* iconos de redes sociales */}
                <div className="flex space-x-6 mb-6">
                    <a href="https://www.facebook.com/share/9372ZJLM7Ju2ewzZ/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#A711D0]">
                        <FaFacebook size={36} />
                    </a>
                    <a href="https://www.instagram.com/villa29restobar/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#A711D0]">
                        <FaInstagram size={36} />
                    </a>
                    <a href="https://www.tiktok.com/@villa29_restobar?_t=8quIkiMBMRS&_r=1" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#A711D0]">
                        <FaTiktok size={36} />
                    </a>
                </div>

                {/* divisor y la direccion */}
                <hr className="border-t-2 border-[#A711D0] w-4/5 mx-auto" />
                <div className="flex items-center text-sm mt-4 mb-2 font-lato">
                    <FaMapMarkerAlt size={20} className="mr-2 icon-location" />
                    <span>Sector 3 Grupo 4 Manzana F Lote 3 VES</span>
                </div>
                <a
                    href="https://maps.google.com"
                    className="text-[#A711D0] underline font-lato text-sm"
                >
                    ¿Cómo llegar a Villa29?
                </a>
            </motion.div>
        </div>
    );
};

export default Navbar;
