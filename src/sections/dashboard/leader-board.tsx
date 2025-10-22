import { EmptyState } from "@/components/empty-state"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"

interface LeaderBoardProps {
  leaders: Array<{
    name: string
    username: string
    tokens: number
    avatar?: string
  }>
}

export function LeaderBoard({ leaders }: LeaderBoardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e0e5f2]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#2b3674] text-lg">Leader Board</h3>
        <button className="text-[#4318ff] text-sm font-medium">See all</button>
      </div>

      {leaders.length > 0 ? (
        <>
          <div className="space-y-4">
            <div className="flex items-center text-[#8f9bba] text-xs font-medium">
              <span className="flex-1">Name</span>
              <span className="w-16 text-center">Tokens</span>
              <span className="w-16 text-center">Rating</span>
            </div>

            {leaders.map((leader) => (
              <div key={leader.username} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#4318ff] text-white text-xs">{leader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#2b3674] text-sm">{leader.username}</p>
                </div>
                <div className="w-16 text-center">
                  <span className="text-[#2b3674] text-sm font-medium">{leader.tokens}</span>
                </div>
                <div className="w-16 text-center">
                  <div className="w-full bg-[#e0e5f2] rounded-full h-2">
                    <div
                      className="bg-[#4318ff] h-2 rounded-full"
                      style={{ width: `${Math.min(100, (leader.tokens / 10000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={Trophy}
          title="Leaderboard coming soon"
          description="Rankings will appear here once you start completing tasks"
        />
      )}
    </div>
  )
}
