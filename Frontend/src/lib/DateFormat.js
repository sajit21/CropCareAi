export function formatMongoDate(mongoDateString) {
  const date = new Date(mongoDateString);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kathmandu", // Optional: set your desired timezone
  });
}
