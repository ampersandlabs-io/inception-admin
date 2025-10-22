import { User } from "@/types";
import { apiClient } from "@lib/apiClient"

  export interface SignInResponse {
    token: string;
    user: { id: string; name: string; email: string };
  }
  
  export async function signIn(email: string, password: string) {
    return apiClient<SignInResponse>("/auth/signin", {
      method: "POST",
      body: { email, password },
    });
  }

  export async function signOut() {
    return apiClient<unknown>("/auth/signout", {
      method: "POST",
      body: {},
    });
  }

  export async function signInWithClerk(token: string) {
    return apiClient<unknown>("/auth/signin", {
      method: "POST",
      body: { "clerk_token": token },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export async function getSignedInUser() {
    return apiClient<User>("/auth/me", {
      method: "GET"
    });
  }

  // export async function getProfile(token: string) {
  //   return apiClient<{ id: string; name: string; email: string }>("users/me", {
  //     method: "GET",
  //     authToken: token,
  //   });
  // }
  