// Install Blueprint Factory console as a permanent local service (macOS launchd + blueprint.local).

import { access, chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const hostAlias = "blueprint.local";
const port = Number(process.env.BLUEPRINT_CONSOLE_PORT ?? 4177);
const label = "com.blueprint-factory.console";
const launchAgentsDir = path.join(os.homedir(), "Library", "LaunchAgents");
const plistPath = path.join(launchAgentsDir, `${label}.plist`);
const logDir = path.join(os.homedir(), "Library", "Logs");
const appSupportDir = path.join(os.homedir(), "Library", "Application Support", "BlueprintFactory");
const wrapperPath = path.join(appSupportDir, "run-console.sh");

function isDocumentsProtectedPath(dir: string): boolean {
  const home = os.homedir();
  for (const sub of ["Documents", "Desktop", "Downloads"]) {
    const protectedRoot = path.join(home, sub);
    if (dir === protectedRoot || dir.startsWith(`${protectedRoot}${path.sep}`)) return true;
  }
  return false;
}

async function which(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("which", [cmd]);
    let out = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.on("close", (code) => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(`${cmd} not found on PATH`));
    });
  });
}

async function hostsHasAlias(): Promise<boolean> {
  try {
    const hosts = await readFile("/etc/hosts", "utf8");
    return hosts.split("\n").some((line) => line.includes(hostAlias) && !line.trim().startsWith("#"));
  } catch {
    return false;
  }
}

async function addHostsAlias(): Promise<boolean> {
  if (await hostsHasAlias()) {
    console.log(`hosts: ${hostAlias} already configured`);
    return true;
  }

  const entry = `127.0.0.1 ${hostAlias}`;
  console.log(`Adding ${entry} to /etc/hosts (needs your password once)...`);
  const ok = await new Promise<boolean>((resolve) => {
    const child = spawn("sudo", ["sh", "-c", `echo '${entry}' >> /etc/hosts`], { stdio: "inherit" });
    child.on("exit", (code) => resolve(code === 0));
  });
  if (ok) console.log(`hosts: added ${hostAlias}`);
  return ok;
}

async function writeWrapper(pnpmPath: string) {
  // Wrapper lives outside ~/Documents so launchd can execute it (macOS TCC blocks
  // background agents from running scripts inside protected folders).
  await mkdir(appSupportDir, { recursive: true });
  const script = `#!/bin/bash
set -euo pipefail
export BLUEPRINT_CONSOLE_PORT=${port}
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
exec /bin/zsh -l -c 'cd ${JSON.stringify(rootDir)} && exec ${JSON.stringify(pnpmPath)} blueprint:console'
`;
  await writeFile(wrapperPath, script, "utf8");
  await chmod(wrapperPath, 0o755);
}

function buildPlist(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${label}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${wrapperPath}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${appSupportDir}</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>StandardOutPath</key>
  <string>${path.join(logDir, "blueprint-console.log")}</string>
  <key>StandardErrorPath</key>
  <string>${path.join(logDir, "blueprint-console.error.log")}</string>
</dict>
</plist>
`;
}

async function launchctl(args: string[]) {
  return new Promise<number>((resolve) => {
    const child = spawn("launchctl", args, { stdio: "inherit" });
    child.on("exit", (code) => resolve(code ?? 1));
  });
}

async function waitForConsole(url: string, attempts = 15): Promise<boolean> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return true;
    } catch {
      // keep trying
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function install() {
  if (process.platform !== "darwin") {
    console.error("console:install currently supports macOS only.");
    console.error("On other platforms, run: pnpm blueprint:console");
    process.exit(1);
  }

  const pnpmPath = await which("pnpm");
  await mkdir(launchAgentsDir, { recursive: true });
  await writeWrapper(pnpmPath);
  await writeFile(plistPath, buildPlist(), "utf8");

  await addHostsAlias();

  // Reload service if already installed
  await launchctl(["bootout", `gui/${process.getuid()}`, plistPath]).catch(() => 0);
  const loadCode = await launchctl(["bootstrap", `gui/${process.getuid()}`, plistPath]);
  if (loadCode !== 0) {
    console.error("Failed to start launch agent. Try: launchctl bootstrap gui/$UID " + plistPath);
    process.exit(1);
  }

  const url = `http://${hostAlias}:${port}`;
  const localUrl = `http://localhost:${port}`;
  const ready = await waitForConsole(localUrl);

  console.log("");
  if (ready) {
    console.log("Blueprint Factory console installed.");
    console.log(`  Bookmark: ${url}`);
    console.log(`  Also:     ${localUrl}`);
    console.log("  Runs in the background and restarts on login.");
  } else {
    console.log("Install finished, but the console did not respond yet.");
    console.log(`  Try:      ${localUrl}`);
    console.log("  Logs:     ~/Library/Logs/blueprint-console.error.log");
    if (isDocumentsProtectedPath(rootDir)) {
      console.log("");
      console.log("  Note: repo is under ~/Documents. If the service keeps failing, either:");
      console.log("    • move the repo outside Documents/Desktop/Downloads, or");
      console.log("    • run manually: pnpm blueprint:console");
    }
  }
  console.log("  Logs:     ~/Library/Logs/blueprint-console.log");
  console.log("");
  console.log("To remove: pnpm blueprint:console:uninstall");
}

async function uninstall() {
  await launchctl(["bootout", `gui/${process.getuid()}`, plistPath]).catch(() => 0);
  try {
    await access(plistPath);
    const { unlink } = await import("node:fs/promises");
    await unlink(plistPath);
    console.log("Removed launch agent.");
  } catch {
    console.log("No launch agent found.");
  }
  console.log(`Note: /etc/hosts entry for ${hostAlias} was left in place (remove manually if you want).`);
}

const cmd = process.argv[2] ?? "install";
if (cmd === "install") install().catch((e) => { console.error(e); process.exit(1); });
else if (cmd === "uninstall") uninstall().catch((e) => { console.error(e); process.exit(1); });
else {
  console.error("Usage: tsx factory/scripts/console-install.ts [install|uninstall]");
  process.exit(1);
}
