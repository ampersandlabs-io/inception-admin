"use client";

import Link from "next/link";
import { ArrowLeft, Bell, User } from "lucide-react";
import { AmpersandLogo } from "@/components/ampersand-logo";
import { Button } from "../ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { signOut as authSignOut } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Dropdown } from "../ui/dropdown";

type HeaderProps = {
  isAuth?: boolean;
};

export function Header({ isAuth = false }: HeaderProps) {

  const { user } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // 1. Call your backend authservice to clear server session
      await authSignOut();

      // 2. When backend confirms, call Clerk signOut
      await clerkSignOut();

      localStorage.clear();

      router.push("/sign-in");
    } catch (err) {
      console.error("Sign out failed:", err);
      // optional: show toast or fallback to force signOut
      await clerkSignOut();
    }
  };

  if (isAuth) {
    return (
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to dashboard
        </Link>
        <AmpersandLogo />
      </div>
    );
  }

  return (
    <header className="">
      <div className="max-w mx-auto py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {/* <h1 className="text-2xl font-bold text-[#2b3674]">Dashboard</h1> */}
          </Link>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#8f9bba]">
              <Bell className="w-5 h-5" />
            </Button>

            {user ? (
              <Dropdown
                trigger={
                  <div className="w-10 h-10 bg-[#4318ff] rounded-full flex items-center justify-center cursor-pointer">
                    <User className="w-5 h-5 text-white" />
                  </div>
                }
                items={[
                  {
                    label: "Profile",
                    onClick: () => {
                      router.push("/profile");
                    },
                  },
                  {
                    label: "Logout",
                    onClick: handleSignOut,
                    className: "text-red-600 hover:bg-red-50",
                  },
                ]}
                align="end"
              />
            ) : (
              <Link
                href="/sign-in"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
  
}
