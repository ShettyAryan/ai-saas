export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  // Normalize separators and camelCase
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ") // Replace dashes/underscores with space
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space between camelCase
  // Convert to title case
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}
