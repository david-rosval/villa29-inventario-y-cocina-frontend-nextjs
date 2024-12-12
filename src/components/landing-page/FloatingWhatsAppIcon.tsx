"use client"

import React from "react";

const FloatingWhatsAppIcon: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+51937280900";
    const message = "Buenas, quisiera solicitar un delivery, por favor.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleWhatsAppClick}
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center justify-center w-16 h-16 cursor-pointer z-50 group"
    >
      {/* texto tooltip */}
      <div className="absolute right-16 sm:right-20 bg-gray-100 text-black text-xs px-8 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform shadow-md whitespace-nowrap font-lato sm:text-sm sm:px-12 sm:py-2">
        ¿Desea pedir un delivery?
      </div>

      {/* icono */}
      <div className="bg-green-500 rounded-full hover:bg-green-600 flex items-center shadow-[0px_0px_40px_rgba(255,255,255,0.8)] justify-center w-12 h-12 sm:w-16 sm:h-16">
        <img
          src="/whatsapp-icon.svg"
          alt="WhatsApp"
          className="w-6 h-6 sm:w-8 sm:h-8"
        />
      </div>
    </div>
  );
};

export default FloatingWhatsAppIcon;
