import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAFE_ROOT = path.resolve(__dirname);

export function resolveFilePath(resolvedFilePath) {
  const trimmed = resolvedFilePath.trim();
  if (!trimmed) {
    throw new TypeError("File path cannot be empty");
  }
  if (path.isAbsolute(trimmed)) {
    throw new TypeError("Absolute paths are not allowed");
  }

  const resolved = path.resolve(SAFE_ROOT, trimmed);
  const relative = path.relative(SAFE_ROOT, resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new TypeError("Path traversal is not allowed");
  }

  return resolved;
}

export const checkIfFileExists = (resolvedFilePath) => {
  return fs.existsSync(resolveFilePath(resolvedFilePath));
};

export const createFile = (resolvedFilePath, fileContent = "") => {
  const writeStream = fs.createWriteStream(resolvedFilePath);
  if (fileContent) {
    writeStream.write(fileContent);
  }
  writeStream.end();
};

export const appendToFile = (resolvedFilePath, fileContent = "") => {
  const appendStream = fs.createWriteStream(resolvedFilePath, { flags: "a" });
  if (fileContent) {
    appendStream.write(fileContent);
  }
  appendStream.end();
};

export const writeToFile = (resolvedFilePath, fileContent = "") => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(resolveFilePath(resolvedFilePath), {
      encoding: "utf8",
    });
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.end(fileContent);
  });
};
