import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { books, categoryMeta } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Books — UltNexus",
  description:
    "Track your reading list, discover new books, and rate every title you finish. UltNexus is your digital bookshelf.",
};

export default function BooksPage() {
  return (
    <CategoryPageLayout
      title="Books"
      description="Your digital bookshelf — discover, track, and rate every title you read."
      accentColor={categoryMeta.BOOK.color}
      items={books}
    />
  );
}
