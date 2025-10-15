"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/contexts/profile-context";
import {
  MoreHorizontal,
  Cloud,
  Edit,
} from "lucide-react";
import Image from "next/image";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  
  const { profileData } = useProfile();

  return (

    <UserProfile />
    // <div className="min-h-screen bg-[#f4f7fe]">
    //   <div className="p-6">
    //     <div className="grid grid-cols-12 gap-6">
    //       <div className="col-span-8">
    //         <div className="bg-white rounded-2xl border border-[#e0e5f2] mb-6 overflow-hidden">
    //           <div className="h-48 bg-gradient-to-r from-[#4318ff] to-[#9f7aea] relative">
    //             <Button
    //               variant="ghost"
    //               size="icon"
    //               className="absolute top-4 right-4 text-white hover:bg-white/20"
    //             >
    //               <MoreHorizontal className="w-5 h-5" />
    //             </Button>
    //           </div>
    //           <div className="px-8 pb-8">
    //             <div className="flex items-end -mt-16 mb-6">
    //               <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
    //                 <Image
    //                   width={15}
    //                   height={15}
    //                   src="/professional-developer-headshot.png"
    //                   alt="Profile"
    //                   className="w-full h-full object-cover"
    //                 />
    //               </div>
    //             </div>
    //             <div className="text-center mb-6">
    //               <h2 className="text-2xl font-bold text-[#2b3674] mb-1">
    //                 {profileData.selectedRole || "Adela Parkson"}
    //               </h2>
    //               <p className="text-[#8f9bba] mb-6">Product Designer</p>
    //               <div className="flex justify-center gap-12">
    //                 <div className="text-center">
    //                   <div className="text-2xl font-bold text-[#2b3674]">
    //                     17
    //                   </div>
    //                   <div className="text-[#8f9bba] text-sm">Posts</div>
    //                 </div>
    //                 <div className="text-center">
    //                   <div className="text-2xl font-bold text-[#2b3674]">
    //                     9.7k
    //                   </div>
    //                   <div className="text-[#8f9bba] text-sm">Followers</div>
    //                 </div>
    //                 <div className="text-center">
    //                   <div className="text-2xl font-bold text-[#2b3674]">
    //                     274
    //                   </div>
    //                   <div className="text-[#8f9bba] text-sm">Following</div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="bg-white rounded-2xl border border-[#e0e5f2] p-6 mb-6">
    //           <h3 className="text-xl font-bold text-[#2b3674] mb-4">
    //             All Projects
    //           </h3>
    //           <p className="text-[#8f9bba] text-sm mb-6">
    //             Here you can find more details about your projects. Keep you
    //             user engaged by providing meaningful information.
    //           </p>
         
    //         </div>

    //         <div className="bg-white rounded-2xl border border-[#e0e5f2] p-6">
    //           <h3 className="text-xl font-bold text-[#2b3674] mb-4">
    //             General Information
    //           </h3>
    //           <p className="text-[#8f9bba] text-sm mb-6">
    //             As we live, our hearts turn colder. Cause pain is what we go
    //             through as we become older. We get insulted by others, lose
    //             trust for those others. We get back stabbed by friends. It
    //             becomes harder for us to give others a hand. We get our heart
    //             broken by people we love, even that we give them all...
    //           </p>
    //           <div className="grid grid-cols-2 gap-6">
    //             <div>
    //               <div className="mb-4">
    //                 <label className="text-[#8f9bba] text-sm">Education</label>
    //                 <p className="text-[#2b3674] font-medium">
    //                   Stanford University
    //                 </p>
    //               </div>
    //               <div className="mb-4">
    //                 <label className="text-[#8f9bba] text-sm">Department</label>
    //                 <p className="text-[#2b3674] font-medium">Product Design</p>
    //               </div>
    //               <div>
    //                 <label className="text-[#8f9bba] text-sm">
    //                   Organization
    //                 </label>
    //                 <p className="text-[#2b3674] font-medium">
    //                   Simmple Web LLC
    //                 </p>
    //               </div>
    //             </div>
    //             <div>
    //               <div className="mb-4">
    //                 <label className="text-[#8f9bba] text-sm">Languages</label>
    //                 <p className="text-[#2b3674] font-medium">
    //                   English, Spanish, Italian
    //                 </p>
    //               </div>
    //               <div className="mb-4">
    //                 <label className="text-[#8f9bba] text-sm">
    //                   Work History
    //                 </label>
    //                 <p className="text-[#2b3674] font-medium">
    //                   Google, Facebook
    //                 </p>
    //               </div>
    //               <div>
    //                 <label className="text-[#8f9bba] text-sm">Birthday</label>
    //                 <p className="text-[#2b3674] font-medium">20 July 1986</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-span-4 space-y-6">
    //         <div className="bg-white rounded-2xl border border-[#e0e5f2] p-6">
    //           <div className="flex items-center gap-3 mb-4">
    //             <div className="w-12 h-12 bg-[#f4f7fe] rounded-xl flex items-center justify-center">
    //               <Cloud className="w-6 h-6 text-[#4318ff]" />
    //             </div>
    //             <div>
    //               <h3 className="font-bold text-[#2b3674]">Your storage</h3>
    //               <p className="text-[#8f9bba] text-sm">
    //                 Supervise your drive space in the easiest way
    //               </p>
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="flex justify-between text-sm mb-2">
    //               <span className="text-[#8f9bba]">25.6 Gb</span>
    //               <span className="text-[#8f9bba]">50 Gb</span>
    //             </div>
    //             <div className="w-full bg-[#e0e5f2] rounded-full h-2">
    //               <div
    //                 className="bg-[#4318ff] h-2 rounded-full"
    //                 style={{ width: "51%" }}
    //               ></div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="bg-white rounded-2xl border border-[#e0e5f2] p-6">
    //           <h3 className="font-bold text-[#2b3674] mb-2">
    //             Complete your profile
    //           </h3>
    //           <p className="text-[#8f9bba] text-sm mb-6">
    //             Stay on the pulse of distributed projects with an online
    //             whiteboard to plan, coordinate and discuss
    //           </p>
    //           <Button className="w-full bg-[#4318ff] hover:bg-[#4318ff]/90 text-white">
    //             Publish now
    //           </Button>
    //         </div>

          
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
