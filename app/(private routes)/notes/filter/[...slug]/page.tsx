import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { isNoteTag } from "@/lib/api/clientApi";
import { fetchNotes } from "@/lib/api/serverApi";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesByTagProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tagParam = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : "all";

  const tag = tagParam === "all" ? "All notes" : isNoteTag(tagParam) ? tagParam : "Unknown tag";

  const title = `Notes ${tag}`;
  const description = `Browse notes in the ${tag} category. Organize your ideas efficiently with NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://07-routing-nextjs-yxvc.vercel.app/notes/filter/${tagParam}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Filtered Notes Page",
        },
      ],
    },
  };
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const resolvedParams = await params;
  const tagParam = Array.isArray(resolvedParams.slug) ? resolvedParams.slug[0] : "all";

  const tag = tagParam === "all" ? undefined : isNoteTag(tagParam) ? tagParam : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", "", 1],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
