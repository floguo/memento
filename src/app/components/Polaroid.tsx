import Image from "next/image";
import { ImageData } from "./ImageData";

export default function Polaroid({ src, alt, caption, date }: ImageData) {
    return (
      <div className="flex flex-col items-center bg-white rounded p-4 m-4 ring-black/[0.02] ring-1 size-12max-w-xs shadow-md">
        <div className="rounded-sm">
          <Image src={src} alt={alt} width={240} height={240} className="rounded-sm" />
        </div>
        {caption && <p className="mt-4 text-sm text-gray-800">{caption}</p>}
        {date && <p className="text-xs text-gray-500 mt-0.5">{date}</p>}
      </div>
    );
  }