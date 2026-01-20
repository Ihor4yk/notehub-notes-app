import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { getTags } from "@/lib/api/clientApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a New Note",
  description:
    "Add a new note quickly and easily with NoteHub. Choose a tag, write your thoughts, and save them for later.",
  openGraph: {
    title: "Create a New Note",
    description:
      "Add a new note quickly and easily with NoteHub. Choose a tag, write your thoughts, and save them for later.",
    url: "https://07-routing-nextjs-yxvc.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note Preview Image",
      },
    ],
  },
};

export default async function CreateNote() {
  const tags = await getTags();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />
      </div>
    </main>
  );
}
