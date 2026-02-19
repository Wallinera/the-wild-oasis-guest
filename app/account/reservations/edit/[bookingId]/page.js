import UpdateReservation from "@/app/_components/UpdateReservation";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = await params;
  const {
    id: reservationId,
    cabinId,
    observations,
    numGuests,
  } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservation
        reservationId={reservationId}
        observations={observations}
        maxCapacity={maxCapacity}
        numGuests={numGuests}
      />
    </div>
  );
}
