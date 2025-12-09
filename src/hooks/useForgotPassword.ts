import { resetPassword } from "@/services/authService";
import { useState } from "react";

export function useForgotPassword() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await resetPassword(email);
    } catch (error) {
      console.error("Failed to reset password:", error);
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleForgotPassword,
    error
  }

}
