import { execSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// One-command deploy for the free GitHub Pages project site.
// Usage: node scripts/deploy-gh-pages.mjs
const owner = "Yakutc";
const repo = "vydoh";
const customUrl = process.env.SITE_URL?.replace(/\/$/, "");
const url = customUrl || `https://${owner.toLowerCase()}.github.io/${repo}`;
const basePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : customUrl
      ? ""
      : `/${repo}`;

console.log(`Building ${url} (base path: "${basePath}") ...`);
execSync("npm run build", {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: url,
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
});

const temp = join(tmpdir(), "vydoh-gh-pages");
rmSync(temp, { recursive: true, force: true });
mkdirSync(temp, { recursive: true });
for (const entry of readdirSync("out")) {
  cpSync(join("out", entry), join(temp, entry), { recursive: true });
}
writeFileSync(join(temp, ".nojekyll"), "");

const run = (command) =>
  execSync(command, { cwd: temp, stdio: "inherit" });

run("git init -b gh-pages");
run("git add -A");
run(
  `git -c user.name="${owner}" -c user.email="askfncs@gmail.com" commit -m "Deploy static site"`,
);
run(`git remote add origin https://github.com/${owner}/${repo}.git`);
run("git push -f origin gh-pages");

console.log(`\nDone: ${url}/`);
console.log("If Pages is not enabled yet: Settings → Pages → Source: gh-pages / root.");
