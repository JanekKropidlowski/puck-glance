import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                   // normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '')   // remove accents
    .toLowerCase()                      // convert to lowercase
    .trim()                            // trim whitespace
    .replace(/\s+/g, '-')              // replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')          // remove non-word chars
    .replace(/\-\-+/g, '-')            // replace multiple hyphens
    .replace(/^-+/, '')                // trim hyphens from start
    .replace(/-+$/, '');               // trim hyphens from end
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
