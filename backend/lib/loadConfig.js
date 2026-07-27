import fs from "fs";
import path from "path";

const rootDir = path.resolve(process.cwd(), "..");

export function readJsonFile(relativePath) {
  const fullPath = path.join(rootDir, relativePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export function loadNairaConfig() {
  const identity = readJsonFile("config/identity.json");
  const permissions = readJsonFile("config/permissions.json");
  const commands = readJsonFile("shared/commands.json");
  const features = readJsonFile("shared/features.json");

  return {
    identity,
    permissions,
    commands,
    features
  };
    }
