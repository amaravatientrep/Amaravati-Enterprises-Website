import fs from "fs";
import path from "path";

// Size of a file in /public, read at build time, as "4.2 MB" — shown beside brochure links so buyers on mobile
// data know what they are about to download. Server components only.
export function fileSize(publicPath) {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", publicPath)).size;
    return bytes >= 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`;
  } catch {
    return null;
  }
}
