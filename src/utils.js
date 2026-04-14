import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function resolveFilePath(userPath) {
  const trimmed = userPath.trim();
  return path.join(__dirname, trimmed);
}

export const checkIfFileExists = (fileName) => {
  return fs.existsSync(resolveFilePath(fileName));
};

export const createFile = (fileName, fileContent = "") => {
  const writeStream = fs.createWriteStream(fileName);
  if (fileContent) {
    writeStream.write(fileContent);
  }
  writeStream.end();
};

export const appendToFile = (fileName, fileContent = "") => {
  const appendStream = fs.createWriteStream(fileName, { flags: "a" });
  if (fileContent) {
    appendStream.write(fileContent);
  }
  appendStream.end();
};

export const writeToFile = (fileName, fileContent = "") => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(resolveFilePath(fileName), {
      encoding: "utf8",
    });
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.end(fileContent);
  });
};
