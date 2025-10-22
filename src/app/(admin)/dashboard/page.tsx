"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/stats-card";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import { TrendingUp, CheckCircle, Folder, Clock, Loader2 } from "lucide-react";
import { getDashboardStats } from "@/services/dashboardService";
import { DashboardStats } from "@/types";
import { LeaderBoard } from "@/sections/dashboard/leader-board";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardStats>();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const dashboardData = await getDashboardStats();
      // console.log(`Dashboard ==> ${JSON.stringify(dashboardData)}`);
      setDashboard(dashboardData);
    } catch (error) {
      // setDashboard(null);
      console.log(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const [showPopulatedData] = useState(false);

  const projects = showPopulatedData
    ? [
        {
          id: 1,
          code_name: "",
          title: "Abstract Colors",
          author: "Esthera Jackson",
          currentBid: "0.91 ETH",
        },
        {
          id: 2,
          code_name: "",
          title: "ETH AI Brain",
          author: "Nick Wilson",
          currentBid: "2.82 ETH",
        },
        {
          id: 3,
          code_name: "",
          title: "Mesh Gradients",
          author: "Will Smith",
          currentBid: "0.56 ETH",
        },
      ]
    : [];

  const taskHistory = showPopulatedData
    ? [
        {
          title: "Colorful Heaven",
          author: "Mark Benjamin",
          amount: "1.30 ETH",
          timeAgo: "30s ago",
          gradientClass: "project-gradient-5",
        },
        {
          title: "Abstract Colors",
          author: "Esthera Jackson",
          amount: "0.91 ETH",
          timeAgo: "58s ago",
          gradientClass: "project-gradient-1",
        },
        {
          title: "ETH AI Brain",
          author: "Nick Wilson",
          amount: "2.82 ETH",
          timeAgo: "1m ago",
          gradientClass: "project-gradient-2",
        },
      ]
    : [];

  const mockLeaders = [
    { name: "M", username: "@maddison_c21", tokens: 9821 },
    { name: "K", username: "@karl.will02", tokens: 7032 },
    { name: "A", username: "@andreea.1z", tokens: 6904 },
    { name: "A", username: "@abraham47.y", tokens: 4309 },
    { name: "S", username: "@simmmple.web", tokens: 3871 },
    { name: "V", username: "@venus.sys", tokens: 3152 },
    { name: "E", username: "@ape.vpp8", tokens: 2907 },
    { name: "L", username: "@leon_pwrr", tokens: 2309 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Projects"
              value={dashboard?.total_projects ?? 0}
              subtitle={dashboard?.growth_rate_projects ?? "-"}
              icon={TrendingUp}
              iconBg="bg-[#4318ff]"
            />
            <StatsCard
              title="Total Squad"
              value={dashboard?.total_developers ?? 0}
              icon={CheckCircle}
              iconBg="bg-[#4318ff]"
            />
            <StatsCard
              title="Total Companies"
              value={dashboard?.total_companies ?? 0}
              icon={Folder}
              iconBg="bg-[#4318ff]"
            />
            <StatsCard
              title="Total Projects"
              value={dashboard?.total_companies ?? 0}
              icon={Folder}
              iconBg="bg-[#4318ff]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Projects */}
        <div className="space-y-">
          <div className="bg-white rounded-2xl p-6 border border-[#e0e5f2]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#2b3674] text-lg">Projects</h3>
              <button className="text-[#4318ff] text-sm font-medium">
                See all
              </button>
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <ProjectCard key={i} {...project} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Clock}
                title="You have no tasks"
                description="Place a bid or get invited to join a project"
              />
            )}
          </div>
        </div>

        {/* Leader */}
        <div className="space-y-6">
          <LeaderBoard leaders={mockLeaders} />
        </div>

        {/* 🟦 Task History Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e0e5f2]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-[#2b3674] text-lg">Task History</h3>
              <button className="text-[#4318ff] text-sm font-medium">
                See all
              </button>
            </div>
            {taskHistory.length > 0 ? (
              <div className="space-y-2">
                {taskHistory.map((task, i) => (
                  <div key={i}>{task.title}</div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Clock}
                title="You have no tasks"
                description="Place a bid or get invited to join a project"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
