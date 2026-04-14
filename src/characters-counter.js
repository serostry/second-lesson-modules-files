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
  stream.on("data", (data) => {
    if (data) {
      console.log(`The file contains ${data.length} characters`);
    }
  });
};

readFile();
