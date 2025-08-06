"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black p-[6rem_4rem] w-full h-screen flex flex-col items-start justify-start gap-4">
      <Link href="/login" className="link-style">
        1. Login
      </Link>
      <Link href="/reset-password" className="link-style">
        2. Reset Password
      </Link>
      <Link href="/register" className="link-style">
        3. Register
      </Link>
      <Link href="/create-password" className="link-style">
        4. Create new password
      </Link>
      <Link href="/dashboard" className="link-style">
        5. Dashboard
      </Link>
    </div>
  );
}
