import { User } from "@/types/user";
import { cookies } from "next/headers";
import { nextServerApi } from "./api";
import { Note, NoteTag } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";
import { AxiosResponse } from "axios";

export const fetchNotes = async (
  searchValue?: string,
  page?: number,
  perPage?: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const response = await nextServerApi.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchValue,
      page,
      perPage,
      tag,
      sortBy,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await nextServerApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServerApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieStore = await cookies();

  const response = await nextServerApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};
