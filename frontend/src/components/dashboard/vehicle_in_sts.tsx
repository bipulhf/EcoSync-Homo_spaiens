"use client";

import { getTimeFromDate } from "@/utils/timeconvert";
import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mx-2 px-3 py-2 text-white text-xl bg-sts_text rounded-lg hover:bg-sts_primary transition-all duration-300"
    >
      {pending ? "Updating" : "Left STS"}
    </button>
  );
}

export default function VechiclesInSTS({
  sts_vehicle,
  leftSTS,
}: {
  sts_vehicle: any;
  leftSTS: any;
}) {
  return (
    <div className="border-2 border-sts_text rounded-lg p-3 my-5">
      <h2 className="text-2xl font-bold">Vechicles in STS:</h2>
      {sts_vehicle.map((vehicle: any) => (
        <form
          action={leftSTS}
          className="text-sts_text text-2xl font-medium my-3"
          key={vehicle.id}
        >
          <input name="id" value={vehicle.id} type="hidden" />
          <span className="mx-2">
            Arrived at: <b>{getTimeFromDate(new Date(vehicle.arrival_time))}</b>
          </span>{" "}
          | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_name}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_mobile}</span>
          <Button />
        </form>
      ))}
      {sts_vehicle.length === 0 && (
        <h2 className="text-xl font-medium">No vehicle to show</h2>
      )}
    </div>
  );
}
