import { getSignedInUser } from "@/services/authService";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAdminGate({
  adminRedirect = "/dashboard",
  signInRedirect = "/sign-in",
  unauthorizedRedirect = "/unauthorized",
}: {
  adminRedirect?: string;
  signInRedirect?: string;
  unauthorizedRedirect?: string;
} = {}) {

    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Don’t run until Clerk is ready or if already verified
        if (!isLoaded) return;
    
        const verifyUser = async () => {
          setChecking(true);
    
          try {
            if (!isSignedIn) {
              router.replace(signInRedirect);
              return;
            }
    
            const user = await getSignedInUser();
            console.log(`User ==> ${JSON.stringify(user)}`);
            if (!user) {
              console.warn("Token missing — redirecting to sign-in");
              router.replace(signInRedirect);
              return;
            }
    
            const isAdmin = user?.public_metadata.user_type === "admin" || user?.is_admin === true;

            console.log(`isAdmin ==> ${isAdmin}`);

            // router.replace(adminRedirect);
    
            if (isAdmin) {
              router.replace(adminRedirect);
            } else {
              router.replace(unauthorizedRedirect);
            }
          } catch (err: any) {
            console.error("Admin verification failed:", err);
            setError(err?.message || "Verification failed");
            router.replace(signInRedirect);
          } finally {
            setChecking(false);
          }
        };
    
        verifyUser();
      }, [isLoaded]); // ✅ only depends on isLoaded

    return { checking, error };
}
