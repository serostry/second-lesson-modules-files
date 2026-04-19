import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";

const readFile = () => {
  const pathToFile = fileURLToPath(import.meta.url);
  const fileDirName = dirname(pathToFile);
  const url = path.join(fileDirName, "article.txt");
  const stream = fs.createReadStream(url, { encoding: "utf8" });
  stream.on("error", () => {
    console.log("Can not read file!");
  });

  const chunks = [];
  stream.on("data", (data) => {
    chunks.push(data);
  });
  stream.on("end", () => {
    const content = chunks.join("");
    console.log(`The file contains ${content.length} characters`);
  });
};

readFile();
