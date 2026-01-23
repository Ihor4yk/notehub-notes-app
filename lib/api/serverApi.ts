import { User } from "@/types/user";
import { Note, NoteTag } from "@/types/note";
import { FetchNotesResponse } from "./clientApi";
import { serverFetch } from "./serverFetch";

export const fetchNotes = (
  searchValue?: string,
  page?: number,
  perPage?: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams({
    ...(searchValue && { search: searchValue }),
    ...(page && { page: page.toString() }),
    ...(perPage && { perPage: perPage.toString() }),
    ...(tag && { tag }),
    ...(sortBy && { sortBy }),
  });

  return serverFetch<FetchNotesResponse>(`/api/notes?${params}`);
};

export const fetchNoteById = (id: string): Promise<Note> => {
  return serverFetch<Note>(`/api/notes/${id}`);
};

export const getMe = (): Promise<User> => {
  return serverFetch<User>(`/api/users/me`);
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await serverFetch("/api/auth/session", {
      redirectOn401: false,
    });
    return true;
  } catch {
    return false;
  }
};
