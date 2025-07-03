import React from "react";

// Este mock reemplaza al componente <Image /> de Next.js por un <img /> simple
export default function Image({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priority,
  unoptimized,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { unoptimized?: boolean; priority?: boolean }) {
  return <img data-unoptimized={unoptimized?.toString()} {...props} />;
}
