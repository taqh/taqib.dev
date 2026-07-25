import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const HTML_TAG_REGEX = /<[^>]*>/g;
const WHITESPACE_REGEX = /\s+/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const plainText = content.replace(HTML_TAG_REGEX, "").trim();
  const wordCount = plainText.split(WHITESPACE_REGEX).length;

  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
