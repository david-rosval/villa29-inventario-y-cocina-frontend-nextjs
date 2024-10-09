import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
        <Image src="/logo-restobar.jpg" alt="Logo" className="mx-auto my-8" width={128} height={128} />
        
        <h1 className="text-4xl font-bold text-center mb-4">Bienvenido al Gestor de Pedidos de Villa 29</h1>
        <p className="text-center mb-8">Un Sistema para facilitar la comunicación entre Atención al Cliente y Cocina</p>
        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button className="mr-4">Iniciar Sesión</Button>
          </Link>
        </div>
      </div>
  );
}
