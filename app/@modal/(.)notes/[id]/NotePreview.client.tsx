"use client";

import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>
          ✕
        </button>
        <h2 className={css.title}>{data.title}</h2>
        {data.tag && <span className={css.tag}>{data.tag}</span>}
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
      </div>
    </Modal>
  );
}
