"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { setTokenProvider } from "@/lib/apiClient";
import { signInWithClerk } from "@/services/authService";

export function useSignInHandler() {

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    } else {
      router.push("sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Handles sign-in logic
  const handleSignIn = async (email: string, password: string) => {

    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn?.create({
        identifier: email,
        password,
      });

      console.log("Clerk sign-in result ==>", result);

      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });

        const token = await getToken();

        if (token) {
          // Sign in with cl
          await signInWithClerk(token);
          setTokenProvider(async () => await getToken());
          localStorage.setItem("token", token);
        }
        // Redirect to your gate route
        router.push("/");
      } else {
        console.log("Sign-in requires additional steps:", result);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoaded,
    handleSignIn,
    loading,
    error,
  };
}
