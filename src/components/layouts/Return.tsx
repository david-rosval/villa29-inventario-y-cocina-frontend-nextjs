"use client"

import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

function Return() {
  const router = useRouter()

  return (
    <div className="hidden md:block">
      <Button onClick={() => router.push('/ordenes')} variant="outline" size="icon"  className="rounded-full">
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default Return