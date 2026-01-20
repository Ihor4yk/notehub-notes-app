import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Sorry, the page you are looking for does not exist. Return to the main page NoteHub.",
  openGraph: {
    title: "Page not found",
    description: "Sorry, the page you are looking for does not exist. Return to the main page NoteHub.",
    url: "https://07-routing-nextjs-yxvc.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
