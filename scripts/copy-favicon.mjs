import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const assetsDir =
  "C:/Users/lukit/.cursor/projects/c-Users-lukit-OneDrive-Desktop-Portfolio/assets";
const publicDir = join(dirname(fileURLToPath(import.meta.url)), "../public");

const srcName = readdirSync(assetsDir).find((f) => f.includes("FaviconLF"));
if (!srcName) throw new Error("Favicon image not found");

mkdirSync(publicDir, { recursive: true });
const dest = join(publicDir, "favicon.png");
copyFileSync(join(assetsDir, srcName), dest);
console.log("Copied favicon:", statSync(dest).size, "bytes");
