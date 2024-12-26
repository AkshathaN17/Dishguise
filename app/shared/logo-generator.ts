export function generateRandomLogo(): string {
  const symbols = ["🥘", "🍲", "🥗", "🍝", "🍜", "🍛"];
  return symbols[Math.floor(Math.random() * symbols.length)];
}