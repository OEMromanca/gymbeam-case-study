"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-white text-gray-900 flex justify-between items-center mx-auto w-full shadow px-4 py-2">
      <img
        src="/images/gymbeam-1.png"
        alt="GymBeam Store Logo"
        className="h-20 w-auto cursor-pointer"
        onClick={() => router.push("/")}
      />

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="inline-flex items-center text-black font-bold cursor-pointer rounded-md hover:text-gray-600 focus:outline-none transition duration-200 ease-in-out px-4"
        >
          Odhlásiť sa
        </button>
      )}
    </nav>
  );
}
