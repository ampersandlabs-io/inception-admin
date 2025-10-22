import { apiClient } from "@/lib/apiClient";
import { PagedResponse, User } from "@/types";

// export async function createUser(data: any) {
//   return apiClient<{}>(`/admin/users`, {
//     method: "POST",
//     body: data,
//   });
// }

export async function updateUser(userId: string, data: User) {
  return apiClient<object>(`/admin/users/${userId}`, {
    method: "PUT",
    body: data,
  });
}

export async function getUsers() {
  return apiClient<PagedResponse<User>>(`/admin/users`, {
    method: "GET",
  });
}
