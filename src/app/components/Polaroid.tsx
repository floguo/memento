import Image from "next/image";
import { ImageData } from "./ImageData";

export default function Polaroid({ src, alt, caption, date }: ImageData) {
  return (
    <div className="flex flex-col items-center bg-white rounded p-4 m-4 ring-1 ring-black/[0.02] shadow-md max-w-xs">
      <Image src={src} alt={alt} width={240} height={240} className="rounded-sm" />
      {caption && <p className="mt-4 text-sm text-gray-800">{caption}</p>}
      {date && <p className="mt-0.5 text-xs text-gray-500">{date}</p>}
    </div>
  );
}