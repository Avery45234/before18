// Hands the user a file to save (a calendar file, an image) without any server.
//
// COPIED FROM the MDN page for URL.createObjectURL:
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static
// The trick is: wrap the data in a Blob, turn the Blob into a temporary link
// address, click an invisible link that points at it, then free the address.

export function downloadFile(data: string | Blob, filename: string, type = "text/plain"): void {
  const blob = typeof data === "string" ? new Blob([data], { type }) : data;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
