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
import { useCallback, useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { getUsers } from "@/services/userService";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Pagination from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function UsersPage() {
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(1); // current page
  const [pageSize] = useState(10); // items per page
  const [totalItems, setTotalItems] = useState(0); // API returns this

  // keep state in sync with url ?page=
  useEffect(() => {
    const paramPage = Number(searchParams.get("page") || "1");
    if (!Number.isNaN(paramPage) && paramPage > 0 && paramPage !== page) {
      setPage(paramPage);
    }
  }, [searchParams, page]);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const usersData = await getUsers(page, pageSize);
      console.log(`Users ==> ${JSON.stringify(usersData)}`);
      setUsers(usersData.items || []);
      setTotalItems(usersData.total || 0);
    } catch (error) {
      console.error("Failed to load data ==>", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalItems / pageSize);
    return pages > 0 ? pages : 1;
  }, [totalItems, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("pageSize", String(pageSize));
    router.replace(`${pathname}?${params.toString()}`);
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
            <>
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

              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
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
