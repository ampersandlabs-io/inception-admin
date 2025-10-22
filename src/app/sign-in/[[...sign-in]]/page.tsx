"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AmpersandLogo } from "@/components/ampersand-logo";
import { Eye, EyeOff } from "lucide-react";
import { theme } from "@/lib/theme";
import { useSignInHandler } from "@/hooks/useSignInHandler";

export default function SignInPage() {
  // const { signIn, setActive } = useSignIn();
  // const { getToken, isSignedIn } = useAuth();

  // const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const { handleSignIn, loading, error } = useSignInHandler();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     console.log("User already signed in, redirecting to dashboard");
  //     router.push("dashboard");
  //   }
  // }, [isSignedIn, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSignIn(email, password);
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
                Welcome back!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email and password to sign in!
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

              <div>
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm hover:underline"
                  style={{ color: theme.colors.primary.lightBlue }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <Button
                type="submit"
                className="w-full h-12 text-white font-medium rounded-sm hover:opacity-90"
                style={{ backgroundColor: theme.colors.primary.blue }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-left text-sm text-slate-600">
              Not registered yet?{" "}
              <Link
                href="/"
                style={{ color: theme.colors.primary.lightBlue }}
                className="hover:underline"
              >
                Contact Admin to get access
              </Link>
            </p>
          </div>
        </div>

        {/* <div className="mt-8 text-center text-xs text-gray-500">
          © 2025 All Rights Reserved
          <div className="mt-2 space-x-4">
            <Link href="/privacy" style={{ color: theme.colors.primary.lightBlue }} className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: theme.colors.primary.lightBlue }} className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
