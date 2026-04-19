import fs from "node:fs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { checkIfFileExists, resolveFilePath, createFile, writeToFile } from "./utils.js";
const rl = readline.createInterface({ input, output });

const getFileName = async () => {
  let fileName = await rl.question("Enter file name: ");
  if (!fileName.trim()) {
    while (true) {
      console.log("File name is required!");
      fileName = await rl.question("Enter file name: ");
      if (fileName.trim()) {
        break;
      }
    }
  }
  return fileName.trim();
};

const readFileContent = (fileName) => {
  return new Promise((res, rej) => {
    const chunks = [];
    const stream = fs.createReadStream(fileName, { encoding: "utf-8" });
    stream.on("data", (data) => {
      chunks.push(data);
    });
    stream.on("end", () => {
      res(chunks.join(""));
    });
    stream.on("error", () => {
      rej(new Error("Can not read the file"));
    });
  });
};

getFileName().then(async (name) => {
  const resolvedPath = resolveFilePath(name);
  const fileExists = checkIfFileExists(name);
  if (fileExists) {
    const replaceText = await rl.question("Do you want to replace any text in the file? Yes/No: ");
    if (replaceText.toLowerCase().trim() === "yes") {
      const fileContent = await readFileContent(resolvedPath);

      let textToReplace;
      while (true) {
        textToReplace = await rl.question("Enter text you want to replace: ");
        if (textToReplace.trim()) {
          break;
        }
        console.log("Please, enter text to replace! It is mandatory!");
      }

      const needle = textToReplace.trim();
      if (!fileContent.includes(needle)) {
        console.log("Nothing to replace in this file. Good luck!");
      } else {
        let textToInsert;
        while (true) {
          textToInsert = await rl.question("Enter text you want to insert: ");
          if (textToInsert.trim()) {
            await writeToFile(name, fileContent.replaceAll(needle, textToInsert));
            break;
          }
          console.log("Please, enter text to insert! It is mandatory!");
        }
      }
    }
    rl.close();
  } else {
    const fileContent = await rl.question("Provide file content: ");
    try {
      createFile(resolvedPath, fileContent);
      rl.close();
    } catch (err) {
      rl.close();
    }
  }
});
