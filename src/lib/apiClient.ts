
import { getStoredToken } from "@/utils/token";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

let tokenProvider: (() => Promise<string | null>) | null = null;

export function setTokenProvider(fn: () => Promise<string | null>) {
  tokenProvider = fn;
}

export async function apiClient<TResponse, TBody = unknown>(
  endpoint: string,
  { method = "GET", body, headers = {} }: ApiOptions<TBody> = {}
): Promise<TResponse> {

  // const token = tokenProvider ? await tokenProvider() : null;
  // console.log(`Token ==> ${token}`)
  const token = getStoredToken();

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // try to parse error body
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const errData = await res.json();
      errorMsg = errData.message || JSON.stringify(errData);
    } catch {
      // fallback: plain text
      const errText = await res.text();
      if (errText) errorMsg = errText;
    }

    toast.error(errorMsg);

    throw new Error(errorMsg);
  }

  return res.json() as Promise<TResponse>;
}