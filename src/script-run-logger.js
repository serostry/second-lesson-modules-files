import fs from "fs";

const fileName = "log.txt";

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const checkIfFileExists = (path) => {
  return fs.existsSync(path);
};

const createLogFile = (fileName) => {
  const writeStream = fs.createWriteStream(fileName);
  writeStream.write(createLogMessage());
};

const appendLogFile = () => {
  const appendStream = fs.createWriteStream(fileName, { flags: "a" });
  appendStream.write(createLogMessage());
};

const createLogMessage = () => {
  return `Script started at ${getCurrentDate()}\n`;
};

const writeLog = () => {
  const fileExists = checkIfFileExists(fileName);
  if (fileExists) {
    appendLogFile();
    return;
  }
  createLogFile(fileName);
};

writeLog();
