"use client";

import { Loader2 } from "lucide-react";
import { useAdminGate } from "@/hooks/useAdminGate";

export default function HomePage() {
  
  const { checking, error } = useAdminGate();

   if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // Nothing to render since redirection happens automatically
  return null;

  // return (
  //   <div className="min-h-screen">
  //     {/* Navigation */}
  //     <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center h-16">
  //           <div className="flex items-center gap-2">
  //             <Globe className="w-8 h-8 text-purple-400" />
  //             <span className="text-xl font-bold text-white">
  //               Inception Platform
  //             </span>
  //           </div>
  //           <div className="flex items-center gap-4">
  //             <Link
  //               href="/sign-in"
  //               className="px-4 py-2 text-white hover:text-purple-300 transition-colors"
  //             >
  //               Sign In
  //             </Link>

  //             <Link
  //               href="/sign-up"
  //               className="px-4 py-2 text-white hover:text-purple-300 transition-colors"
  //             >
  //               Get Started
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>

  //     {/* Hero Section */}

  //     {/* Footer */}
  //     <footer className="bg-black/30 border-t border-white/10 py-8 mt-20">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex flex-col md:flex-row justify-between items-center">
  //           <div className="flex items-center gap-2 mb-4 md:mb-0">
  //             <Globe className="w-6 h-6 text-purple-400" />
  //             <span className="text-white font-medium">Inception Platform</span>
  //           </div>
  //           <p className="text-gray-400 text-sm">
  //             © 2024 Inception Platform. All rights reserved.
  //           </p>
  //         </div>
  //       </div>
  //     </footer>
  //   </div>
  // );
}
