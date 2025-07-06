"use client"

import { LayoutDashboard, ListOrdered, ListPlus, Users } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ordenes/UserProvider";
 
const featuresList = [
  {
    Icon: ListOrdered,
    name: "Ordenes",
    description: "Visualiza y gestiona todas las órdenes realizadas en el día.",
    href: "/panel-de-control/ordenes",
    cta: "Gestionar ordenes",
    background: <Image src="/ordenes.webp" alt="ordenes" width={1000} height={1000} className="absolute top-0 -inset-x-0 blur-md transition-all duration-300 ease-out group-hover:blur-sm group-hover:scale-110 opacity-50" />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Users,
    name: "Usuarios",
    description: "Administra roles, permisos y datos de los usuarios del sistema.",
    href: "/panel-de-control/usuarios",
    cta: "Gestionar usuarios",
    background: <Image src="/dashboard.webp" alt="usuarios" width={1000} height={1000} className="absolute bottom-32 -inset-x-0 blur-md transition-all duration-300 ease-out group-hover:blur-sm group-hover:scale-110 opacity-50" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: ListPlus,
    name: "Crear Orden",
    description: "Registra productos y cantidades para crear una nueva orden.",
    href: "/panel-de-control/ordenes/nueva-orden",
    cta: "Crear nueva orden",
    background: <Image src="/nueva-orden.webp" alt="crear-orden" width={1000} height={1000} className="absolute bottom-32 -inset-x-0 blur-md transition-all duration-300 ease-out group-hover:blur-sm group-hover:scale-110 opacity-50" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: LayoutDashboard,
    name: "Dashboard",
    description: "Analiza pedidos, tiempos y ventas del restobar. ",
    href: "/panel-de-control/dashboard",
    cta: "Ir al dashboard",
    background: <Image src="/dashboard.webp" alt="dashboard" width={1000} height={1000} className="absolute bottom-32 -inset-x-0 blur-md transition-all duration-300 ease-out group-hover:blur-sm group-hover:scale-110 opacity-50" />,
    className: "col-span-3 lg:col-span-1",
  },
  
];

export default function PanelDeControlComponent() {
  const [features, setfeatures] = useState(featuresList)
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  
  useEffect(() => {
    if (user?.rol !== "Administrador") {
      setfeatures(featuresList.filter((feature) => feature.name !== "Usuarios" && feature.name !== "Dashboard"));
    }
  
    return () => {
      setfeatures(featuresList);
    }
  }, [user?.rol]);
  

  return (
    <BentoGrid>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}