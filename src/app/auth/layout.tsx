"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-primary flex justify-center items-center relative overflow-hidden">
      {/* Elipse superior */}
      <div className="absolute top-[-80px] left-[-80px] opacity-90">
        <div className="relative w-[500px] h-[550px] ">
          <div className="absolute top-0 left-0 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
          <div className="absolute bottom-0 right-4 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
        </div>
      </div>
      {/* Elipse inferior */}
      <div className="absolute bottom-[-80px] right-[-80px] opacity-90">
        <div className="relative w-[500px] h-[550px] ">
          <div className="absolute top-0 left-0 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
          <div className="absolute bottom-0 right-4 bg-none h-[350px] w-[350px] rounded-full border-[40px] border-secondary" />
        </div>
      </div>
      {/* logo y formulario */}
      <div className="z-10 flex flex-col items-center ">
        <div className="relative h-20 w-20 rounded-full overflow-hidden mb-8">
          <Image 
            src='https://raw.githubusercontent.com/david-rosval/villa29-images-menu/refs/heads/main/logo-restobar.webp'
            alt="Logo" 
            fill={true}
          />
        </div>
        <Card className="w-[450px] mb-10 pt-8 pb-10 px-14">
          <CardHeader>
            <CardTitle className="text-xl text-center">Inicio de Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}