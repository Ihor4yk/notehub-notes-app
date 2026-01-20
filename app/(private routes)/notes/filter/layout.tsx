import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutNotesProps) {
  return (
    <section className={css.notesWrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.container}>{children}</div>
    </section>
  );
}
