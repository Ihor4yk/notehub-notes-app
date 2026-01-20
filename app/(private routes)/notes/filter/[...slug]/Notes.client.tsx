"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { NoteTag } from "@/types/note";
import { fetchNotes, isNoteTag } from "@/lib/api/clientApi";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const safeTag: NoteTag | undefined = tag && isNoteTag(tag) ? tag : undefined;

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["notes", safeTag ?? "all", searchValue, currentPage],
    queryFn: () => fetchNotes(searchValue, currentPage, perPage, safeTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchValue(val);
    setCurrentPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        )}
        <Link className={css.link} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      <div className={css.divider} />

      {isFetching && (
        <div className={css.loaderWrapper}>
          <p className={css.fetching}>Refreshing notes...</p>
        </div>
      )}

      {isSuccess && !isFetching && data.notes.length === 0 && (
        <div className={css.emptyState}>
          <p>No notes found 😕</p>
          <span>Try changing your search or create a new note.</span>
        </div>
      )}

      {isSuccess && !isFetching && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
