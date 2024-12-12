
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='h-dvh pt-[4.5rem] flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <Loader2 className="animate-spin size-14" />
        <p className='font-semibold text-lg text-center'>Cargando información de los usuarios...</p>
      </div>
    </div>
  )
}
