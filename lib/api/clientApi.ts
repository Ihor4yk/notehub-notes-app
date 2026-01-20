import type { Note, NoteTag } from "@/types/note";
import { nextServerApi } from "./api";
import { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteRequest = {
  title: string;
  content: string;
  tag: NoteTag;
};

interface CheckSessionRequest {
  success: boolean;
}

interface UpdateUserRequest {
  username?: string;
  avatar?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const allTags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export function isNoteTag(value: unknown): value is NoteTag {
  return typeof value === "string" && allTags.includes(value as NoteTag);
}

export const fetchNotes = async (
  searchValue?: string,
  page?: number,
  perPage?: number,
  tag?: NoteTag,
  sortBy?: string,
): Promise<FetchNotesResponse> => {
  const response = await nextServerApi.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchValue,
      page,
      perPage,
      tag,
      sortBy,
    },
  });

  return response.data;
};

export const createNote = async (data: CreateNoteRequest): Promise<Note> => {
  const response = await nextServerApi.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServerApi.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServerApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const getTags = async (): Promise<NoteTag[]> => {
  return allTags;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await nextServerApi.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await nextServerApi.post<User>("/auth/login", data);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServerApi.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const logout = async (): Promise<void> => {
  await nextServerApi.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await nextServerApi.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServerApi.patch<User>("/users/me", payload);
  return res.data;
};
