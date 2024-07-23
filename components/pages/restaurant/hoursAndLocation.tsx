import { MapPin } from "lucide-react";
import Link from "next/link";

export default function HoursAndLocation({
  address,
  wilaya,
  location,
  hours,
}: {
  address: string;
  wilaya: string;
  location: string;
  hours: {
    day: string;
    from: string | null;
    to: string | null;
    isClosed: boolean;
  }[];
}) {
  function hoursContoller(hour: { day: string; from: string | null; to: string | null; isClosed: boolean }) {
    const currentDate = new Date(Date.now());
    const currentDay = currentDate.getDay();
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

    switch (hour.day) {
      case "mon":
        return { day: "Monday", isClosed: isClosed, isToday: currentDay === 1 };
      case "tue":
        return {
          day: "Tuesday",
          isClosed: isClosed,
          isToday: currentDay === 2,
        };
      case "wed":
        return {
          day: "Wednesday",
          isClosed: isClosed,
          isToday: currentDay === 3,
        };
      case "thu":
        return {
          day: "Thursday",
          isClosed: isClosed,
          isToday: currentDay === 4,
        };
      case "fri":
        return { day: "Friday", isClosed: isClosed, isToday: currentDay === 5 };
      case "sat":
        return {
          day: "Saturday",
          isClosed: isClosed,
          isToday: currentDay === 6,
        };
      case "sun":
        return { day: "Sunday", isClosed: isClosed, isToday: currentDay === 0 };
      default:
        return {
          day: "Some day",
          isClosed: isClosed,
          isToday: currentDay === -1,
        };
    }
  }
  return (
    <div className="pt-9">
      <p className="text-2xl font-semibold">Location & Hours</p>
      <div className="pt-4 flex lg:flex-row flex-col-reverse justify-between items-center gap-4 lg:gap-10">
        <table className="flex-none lg:w-[50%] w-full">
          <tbody>
            {hours.map((hour, index) => (
              <tr key={index}>
                <td className="font-medium pr-8 py-1.5">{hoursContoller(hour).day}</td>
                <td className="pr-8 py-1.5">
                  {!hour.isClosed && hour.from !== null && hour.to !== null
                    ? hour.from + " - " + hour.to
                    : "Closed"}
                </td>
                {hoursContoller(hour).isClosed ? (
                  <td
                    className={`text-red-500 py-1.5 xs:text-left text-center ${
                      hoursContoller(hour).isToday ? "" : "hidden"
                    }`}
                  >
                    Closed now
                  </td>
                ) : (
                  <td
                    className={`text-green-600 py-1.5 xs:text-left text-center ${
                      hoursContoller(hour).isToday ? "" : "hidden"
                    }`}
                  >
                    Opened now
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.22] relative border rounded-md lg:w-[50%] w-full h-[15rem] flex justify-center items-center flex-col gap-6">
          <div className="flex justify-center items-center p-3 border rounded-md bg-muted/40">
            <MapPin className="size-10" />
          </div>
          <p className="text-xl font-medium text-center">
            {address}, {wilaya}
          </p>
          <Link target="_blank" className="text-primary hover:text-primary/80 text-sm" href={location}>
            Google map link
          </Link>
        </div>
      </div>
    </div>
  );
}
