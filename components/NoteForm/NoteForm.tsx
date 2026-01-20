"use client";

import css from "./NoteForm.module.css";
import { useId } from "react";
import type { NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, CreateNoteRequest } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";

interface NoteFormProps {
  tags: NoteTag[];
}

export default function NoteForm({ tags }: NoteFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleCancel = () => router.back();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNoteRequest;
    mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor={`${fieldId}-title`}>
          Title
          <input
            className={css.input}
            id={`${fieldId}-title`}
            type="text"
            name="title"
            defaultValue={draft?.title}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor={`${fieldId}-content`}>
          Content
          <textarea
            className={css.textarea}
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            defaultValue={draft?.content}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor={`${fieldId}-tag`}>
          Tag
          <select
            className={css.select}
            id={`${fieldId}-tag`}
            name="tag"
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit">
          Create
        </button>
        <button className={css.cancelButton} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
