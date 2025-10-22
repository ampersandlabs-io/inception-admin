
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/shared/header";
import type React from "react";

// import { useAuth } from "@clerk/nextjs";
// import { setTokenProvider } from "@/lib/apiClient";
// import { useEffect } from "react";
// import { signInWithClerk } from "@/services/authService";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server"; // or your auth check

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { getToken, isSignedIn, isLoaded } = useAuth();

  // register the provider once
  // useEffect(() => {
  //   if (!isLoaded || !isSignedIn) return;

  //   // Get token
  //   setTokenProvider(async () => await getToken());

  //   // Send token
  //   (async () => {
  //     const token = await getToken();
  //     if (token) {
  //       await signInWithClerk(token);
  //     }
  //   })();
  // }, [isLoaded, isSignedIn, getToken]);

  const user = await currentUser(); // or fetch session token
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex">
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="ml-64 flex-1 p-6">
        {/* Header */}
        <Header />
        <aside>{children}</aside>
      </div>
    </div>
  );
}
