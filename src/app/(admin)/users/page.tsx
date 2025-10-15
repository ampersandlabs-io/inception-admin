"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ChevronDown, Loader2, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { getUsers } from "@/services/userService";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UsersPage() {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      console.log(`Users ==> ${JSON.stringify(usersData)}`);
      setUsers(usersData.items || []);
    } catch (error) {
      console.error("Failed to load data ==>", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6 border-[#e0e5f2]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2b3674]">Users</h3>
          </div>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-[#e0e5f2]">
                  <TableHead className="text-[#a3aed0] font-medium">
                    <div className="flex items-center gap-2">
                      Email <ChevronDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#a3aed0] font-medium">
                    <div className="flex items-center gap-2">
                      First Name <ChevronDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#a3aed0] font-medium">
                    <div className="flex items-center gap-2">
                      Last Name <ChevronDown className="w-3 h-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#a3aed0] font-medium">
                    <div className="flex items-center gap-2">
                      Role <ChevronDown className="w-3 h-3" />
                    </div>
                  </TableHead>

                  <TableHead className="text-[#a3aed0] font-medium"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-[#e0e5f2]">
                    <TableCell className="text-[#2b3674] font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={user.profile_image_url}
                            alt={user.first_name}
                          />
                          <AvatarFallback>{user.first_name}</AvatarFallback>
                        </Avatar>

                        <span className="text-sm text-[#2b3674]">
                          {user.email}
                        </span>

                        {user.is_admin && (
                          <Badge className="bg-blue-500 text-white">
                            Admin
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-[#a3aed0]">
                      {user.first_name}
                    </TableCell>

                    <TableCell className="text-[#a3aed0]">
                      {user.last_name}
                    </TableCell>

                    <TableCell className="text-[#a3aed0]">
                      {user.user_type}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#a3aed0]"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e0e5f2]">
              <EmptyState
                icon={User2}
                title="You have no users"
                description="No users"
                actionText=""
                onAction={() => {}}
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
