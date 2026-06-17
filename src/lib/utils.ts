import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Standardizes a Philippine mobile number to the 09xxxxxxxxx format.
 * Handles inputs like +639..., 639..., 9... and removes non-numeric characters.
 */
export function formatPhoneNumber(num: string): string {
  if (!num) return num;
  let cleaned = num.replace(/[^\d+]/g, "");
  
  if (cleaned.startsWith("+63")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("63") && cleaned.length >= 12) {
    cleaned = "0" + cleaned.slice(2);
  } else if (cleaned.startsWith("9") && cleaned.length === 10) {
    cleaned = "0" + cleaned;
  }
  
  return cleaned;
}
