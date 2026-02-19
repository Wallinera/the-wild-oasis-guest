import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = await params;

  try {
    const [cabin, bookedDtes] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDtes });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {

// }
