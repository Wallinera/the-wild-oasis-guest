"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (
    prevState.nationalID === nationalID &&
    prevState.nationality === nationality
  )
    return prevState;
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    nationalID,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");

  return data;
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  // const guestBookings = await getBookings(session.user.guestId);
  // const guestBookingIds = guestBookings.map((booking) => booking.id);

  // if (!guestBookingIds.includes(bookingId))
  //   throw new Error("You are not allowed to delete this booking!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const bookingId = Number(formData.get("bookingId"));

  if (
    String(prevState.numGuests) === numGuests &&
    prevState.observations === observations
  )
    return prevState;

  const updatedData = {
    numGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(prevState, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const bookingDataRaw = formData.get("bookingData");
  const bookingData = bookingDataRaw ? JSON.parse(bookingDataRaw) : {};

  const newBookingObject = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBookingObject]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath("/account/reservations");
  redirect("/cabins/thankyou");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/account" });
}
