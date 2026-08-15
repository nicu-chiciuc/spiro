import { copyFile, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const MAX_CLOUDFLARE_ASSET_BYTES = 25 * 1024 * 1024;
const outputDirectory = resolve("dist/client");
const publicFiles = ["dat.gui.min.new.js", "index.html", "stats.min.js"] as const;

await rm(resolve("dist"), { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const publicFile of publicFiles) {
  const sourcePath = resolve(publicFile);
  const sourceStat = await stat(sourcePath);

  if (sourceStat.size > MAX_CLOUDFLARE_ASSET_BYTES) {
    throw new Error(`${publicFile} exceeds Cloudflare's 25 MiB static-asset limit.`);
  }

  await copyFile(sourcePath, resolve(outputDirectory, publicFile));
}

const indexHtml = await readFile(resolve(outputDirectory, "index.html"), "utf8");
for (const browserScript of ["dat.gui.min.new.js", "stats.min.js"] as const) {
  if (!indexHtml.includes(`src="${browserScript}"`)) {
    throw new Error(`index.html does not load ${browserScript}.`);
  }
}

const builtFiles = (await readdir(outputDirectory)).sort();
if (JSON.stringify(builtFiles) !== JSON.stringify(publicFiles)) {
  throw new Error(`Unexpected provider artifact: ${builtFiles.join(", ")}`);
}

globalThis.console.log(`Built exactly ${builtFiles.length} public assets in dist/client.`);
