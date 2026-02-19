import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservarionProvider } from "./_components/ReservationContext";
import { AuthProvider } from "./_components/AuthContext";
import { auth } from "./_lib/auth";

export const metadata = {
  // title: "The Wild Oasis",

  title: {
    default: "Welcome | The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "The Wild Oasis is a nature retreat offering cozy cabins, outdoor activities, and a tranquil escape from city life. Experience the beauty of nature and unwind in our serene oasis, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and lush forests. ",
};

async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col `}
      >
        <AuthProvider session={session}>
          <Header />
          <div className="flex-1 px-8 py-12  grid">
            <main className="max-w-7xl  mx-auto h-full w-full">
              <ReservarionProvider>{children}</ReservarionProvider>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
