import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const assetsDir =
  "C:/Users/lukit/.cursor/projects/c-Users-lukit-OneDrive-Desktop-Portfolio/assets";
const dest = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/assets/about/lucas-felice.png",
);

const srcName = readdirSync(assetsDir).find((f) => f.includes("Foto_Carnet_1"));
if (!srcName) throw new Error("Profile image not found");

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(join(assetsDir, srcName), dest);
console.log("Copied", statSync(dest).size, "bytes");
