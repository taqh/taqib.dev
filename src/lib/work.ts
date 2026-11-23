import { type CollectionEntry, getCollection } from "astro:content";

/** Drafts show in `astro dev` only, so client work stays off the live site until it is approved. */
export const getWorkEntries = async () => {
  const entries = await getCollection(
    "work",
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return entries.sort((a, b) => publishedTime(b) - publishedTime(a));
};

/** Newest first, with unpublished drafts above everything. */
const publishedTime = (entry: CollectionEntry<"work">) =>
  entry.data.publishedAt?.getTime() ?? Number.POSITIVE_INFINITY;
