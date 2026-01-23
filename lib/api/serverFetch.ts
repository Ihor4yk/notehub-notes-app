import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ServerFetchOptions extends RequestInit {
  redirectOn401?: boolean;
}

export const serverFetch = async <T>(url: string, options: ServerFetchOptions = {}): Promise<T> => {
  const cookieStore = await cookies();

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (res.status === 401 && options.redirectOn401 !== false) {
    redirect("/sign-in");
  }

  if (!res.ok) {
    throw new Error(`Server fetch failed: ${res.status}`);
  }

  return res.json();
};
