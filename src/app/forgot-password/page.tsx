"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmpersandLogo } from "@/components/ampersand-logo";
import { theme } from "@/lib/theme";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleForgotPassword, error } = useForgotPassword();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleForgotPassword(email);
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <AmpersandLogo />
            <small>ADMIN</small>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Forgot Password?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                No worries we will send reset
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-[50px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400 rounded-sm"
                />
              </div>

              {/* <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password<span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[50px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400 pr-10 rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div> */}

              <div className="flex items-center justify-between">
                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-700">
                    Remember me
                  </Label>
                </div> */}
                {/* <Link
                  href="/forgot-password"
                  className="text-sm hover:underline"
                  style={{ color: theme.colors.primary.lightBlue }}
                >
                  Forgot password?
                </Link> */}
              </div>

              {/* Button */}
              <Button
                type="submit"
                disabled={!email}
                className="w-full h-12 text-white font-medium rounded-sm hover:opacity-90"
                style={{ backgroundColor: theme.colors.primary.blue }}
              >
                {loading ? "Resetting..." : "Reset password"}
              </Button>
            </form>

            <p className="text-left text-sm text-slate-600">
              {/* Not registered yet?{" "} */}

              <Link
                href="/login"
                style={{ color: theme.colors.primary.lightBlue }}
                className="hover:underline"
              >
                {/* <ArrowLeft />  */}
                <span>Back to Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
