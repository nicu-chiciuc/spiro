import { spawn } from "node:child_process";
import process from "node:process";

const modes = {
  deploy: ["deploy"],
  preview: ["versions", "upload"],
};

const [mode, ...extraArgs] = process.argv.slice(2);
if (mode !== "deploy" && mode !== "preview") {
  throw new Error("Usage: node ./scripts/deploy-cloudflare.ts <deploy|preview> [wrangler flags]");
}

if (extraArgs.some((value) => value !== "--dry-run" && value !== "--dry-run=true")) {
  throw new Error("Only Wrangler's --dry-run flag is accepted by the deploy wrapper.");
}

const workerName =
  process.env["WRANGLER_CI_OVERRIDE_NAME"] ?? process.env["CLOUDFLARE_WORKER_NAME"];

if (!workerName) {
  throw new Error(
    "Workers Builds must provide WRANGLER_CI_OVERRIDE_NAME; local checks use CLOUDFLARE_WORKER_NAME.",
  );
}

if (!/^[a-zA-Z0-9-]+$/.test(workerName)) {
  throw new Error("Cloudflare Worker names can only contain letters, numbers, and dashes.");
}

const child = spawn("wrangler", [...modes[mode], "--name", workerName, ...extraArgs], {
  shell: process.platform === "win32",
  stdio: "inherit",
});

await new Promise((resolve, reject) => {
  child.on("error", reject);
  child.on("close", (code) =>
    code === 0 ? resolve(undefined) : reject(new Error(`Wrangler exited with code ${code ?? 1}`)),
  );
});
