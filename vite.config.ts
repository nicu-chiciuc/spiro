import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

import { defineConfig } from "vite-plus";

const outputDirectory = "dist/client";
const legacyBrowserArtifacts = ["dat.gui.min.new.js", "stats.min.js"];
const preservedBrowserSources = ["index.html", ...legacyBrowserArtifacts];

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  build: {
    outDir: outputDirectory,
  },
  fmt: {
    ignorePatterns: preservedBrowserSources,
  },
  lint: {
    ignorePatterns: preservedBrowserSources,
  },
  plugins: [
    {
      name: "copy-legacy-browser-artifacts",
      async writeBundle() {
        await Promise.all(
          legacyBrowserArtifacts.map((artifact) =>
            copyFile(resolve(artifact), resolve(outputDirectory, artifact)),
          ),
        );
      },
    },
  ],
});
