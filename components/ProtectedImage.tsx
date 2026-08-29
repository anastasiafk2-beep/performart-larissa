"use client";

import Image, { ImageProps } from "next/image";

export default function ProtectedImage(props: ImageProps) {
  return (
    <Image
      {...props}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        ...(props.style || {}),
      }}
    />
  );
}