import Image from "next/image";
import Link from "next/link";

export default function Dishe({ name, image, price }: { name: string; image: string; price: number }) {
  return (
    <div>
      <div className="w-full aspect-video border rounded-md bg-popover">
        <Image
          height={0}
          width={0}
          quality={30}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          src={image}
          alt="Car image"
          className=" rounded-md"
        />
      </div>
      <div className="w-full mt-2 px-1 flex justify-between items-center gap-2">
        <p className="xsp:text-lg text-xl font-medium">{name}</p>
        <p className="p-1 rounded-md border border-primary text-nowrap">{price} DA</p>
      </div>
    </div>
  );
}
