import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { categoryMeta } from "@/lib/mockData";
import { fetchBooks } from "@/lib/api";

export const metadata: Metadata = {
  title: "Books — UltNexus",
  description:
    "Log your reading journey. Discover new books, write reviews, and build your digital library.",
};

export default async function BooksPage() {
  const books = await fetchBooks();

  return (
    <CategoryPageLayout
      title="Books"
      description="Log your reading journey. Discover new books, write reviews, and build your digital library."
      accentColor={categoryMeta.BOOK.color}
      items={books}
    />
  );
}
