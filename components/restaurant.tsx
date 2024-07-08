import { Check, MapPin, Star, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import RestaurantLikeButton from "./restaurantLikeButton";

export default function Restaurant({
  id,
  name,
  image,
  rating,
  reviewsTotalNumber,
  wilaya,
  isLiked,
  hours,
}: {
  id: string;
  name: string;
  image: string;
  rating: string;
  reviewsTotalNumber: number;
  wilaya: string;
  isLiked: boolean;
  hours: {
    day: string;
    from: string | null;
    to: string | null;
    isClosed: boolean;
  }[];
}) {
  const currentDate = new Date(Date.now());
  const currentDay = currentDate.getDay();

  function hoursContoller(hour: { day: string; from: string | null; to: string | null; isClosed: boolean }) {
    let isClosed;
    if (hour.isClosed || !hour.from || !hour.to) isClosed = true;
    else {
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      const currentTotalMinutes = currentHour * 60 + currentMinute;

      const fromHour = Number(hour.from.split(":")[0]);
      const fromMinute = Number(hour.from.split(":")[1]);
      const fromTotalMinutes = fromHour * 60 + fromMinute;

      const toHour = Number(hour.to.split(":")[0]);
      const toMinute = Number(hour.to.split(":")[1]);
      const toTotalMinutes = toHour * 60 + toMinute;

      if (fromTotalMinutes < toTotalMinutes) {
        isClosed = !(currentTotalMinutes >= fromTotalMinutes && currentTotalMinutes <= toTotalMinutes);
      } else {
        isClosed = !(currentTotalMinutes >= fromTotalMinutes || currentTotalMinutes <= toTotalMinutes);
      }
    }

    return isClosed;
  }
  return (
    <div className="border rounded-md shadow-md">
      <Link href={`/restaurant/${id}`}>
        <div className="w-full border-b rounded-t-md bg-popover">
          <Image
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            src={image}
            alt="Car image"
            className="object-cover aspect-video rounded-t-md"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-start items-start py-2 px-3">
        <p className="text-sm text-muted-foreground flex justify-start items-center gap-0.5">
          <MapPin className="size-4" />
          {wilaya}
        </p>
        <div className="w-full flex justify-between items-center gap-5">
          <Link href={`/restaurant/${id}`}>
            <p className="text-2xl sm:hover:underline">{name}</p>
          </Link>
          <RestaurantLikeButton restaurantId={id} initialIsLiked={isLiked} />
        </div>
        <div className="mt-0.5 w-full flex justify-start items-center gap-2 flex-wrap">
          <div className="flex justify-start items-center gap-1">
            <Star className="size-5 rounded-full bg-yellow-500 text-white p-1" />
            <span className="text-sm">
              {rating} ({reviewsTotalNumber} reviews) •
            </span>
          </div>
          {hoursContoller(hours[currentDay !== 0 ? currentDay - 1 : 6]) ? (
            <p className={`text-red-500 text-sm`}>Closed now</p>
          ) : (
            <p className={`text-green-600 text-sm`}>Opened now</p>
          )}
        </div>
      </div>
    </div>
  );
}
