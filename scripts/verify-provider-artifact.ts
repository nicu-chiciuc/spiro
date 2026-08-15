/// <reference types="node" />
import { readFile, readdir, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";

const MAX_CLOUDFLARE_ASSET_BYTES = 25 * 1024 * 1024;
const artifactDirectory = resolve("dist/client");
const requiredFiles = ["index.html", "dat.gui.min.new.js", "stats.min.js"];

for (const requiredFile of requiredFiles) {
  const requiredPath = resolve(artifactDirectory, requiredFile);
  const requiredStat = await stat(requiredPath);
  assert(requiredStat.isFile(), `${requiredFile} is not a file`);
}

const indexHtml = await readFile(resolve(artifactDirectory, "index.html"), "utf8");
assert(indexHtml.includes('src="dat.gui.min.new.js"'), "index.html does not load dat.gui");
assert(indexHtml.includes('src="stats.min.js"'), "index.html does not load stats.js");
assert(indexHtml.includes('id="draw_canvas"'), "index.html lacks the interactive drawing canvas");
assert(indexHtml.includes("startScript()"), "index.html lacks the spirograph startup hook");

const assetPaths = await collectFiles(artifactDirectory);
for (const assetPath of assetPaths) {
  const assetStat = await stat(assetPath);
  const relativePath = relative(artifactDirectory, assetPath);
  assert(
    assetStat.size <= MAX_CLOUDFLARE_ASSET_BYTES,
    `${relativePath} is ${assetStat.size} bytes (Cloudflare limit: ${MAX_CLOUDFLARE_ASSET_BYTES})`,
  );
}

globalThis.console.log(
  `Verified ${assetPaths.length} provider assets; largest allowed size is ${MAX_CLOUDFLARE_ASSET_BYTES} bytes.`,
);

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths: string[] = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      paths.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile()) {
      paths.push(entryPath);
    }
  }

  return paths;
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
