import { User } from "@/types/user";
import { cookies } from "next/headers";
// import { nextServerApi } from "./api";
import { Note, NoteTag } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";

export const fetchNotes = async (
  searchValue?: string,
  page?: number,
  perPage?: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const params = new URLSearchParams({
    ...(searchValue && { search: searchValue }),
    ...(page && { page: page.toString() }),
    ...(perPage && { perPage: perPage.toString() }),
    ...(tag && { tag }),
    ...(sortBy && { sortBy }),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes?${params.toString()}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
};

// export const fetchNotes = async (
//   searchValue?: string,
//   page?: number,
//   perPage?: number,
//   tag?: NoteTag,
//   sortBy?: string,
// ): Promise<FetchNotesResponse> => {
//   const cookieStore = await cookies();

//   const response = await nextServerApi.get<FetchNotesResponse>("/notes", {
//     params: {
//       search: searchValue,
//       page,
//       perPage,
//       tag,
//       sortBy,
//     },
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return response.data;
// };

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch note");
  }

  return res.json();
};

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const cookieStore = await cookies();

//   const response = await nextServerApi.get<Note>(`/notes/${id}`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return response.data;
// };

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};

// export const getMe = async (): Promise<User> => {
//   const cookieStore = await cookies();

//   const { data } = await nextServerApi.get("/users/me", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return data;
// };

export const checkSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.ok;
};

// export const checkSession = async (): Promise<AxiosResponse> => {
//   const cookieStore = await cookies();

//   const response = await nextServerApi.get("/auth/session", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });

//   return response;
// };
