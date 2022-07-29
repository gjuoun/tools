import fs from "fs";
import path from "path";

const filePaths: string[] = [];

const rootPath = path.join(__dirname, "ass");
fs.readdirSync(rootPath).forEach((file) => {
  filePaths.push(path.join(rootPath, file));
});

const headerRegex = /\[Script Info\].*Effect, Text/ms;
const leftStartRegex = /Dialogue.*,,/g;
const largeLineBreak = /\\N\{\\fs38\}/g;

filePaths.forEach((path) => {
  fs.readFile(path, { encoding: "utf16le" }, (err, data) => {
    const refinedText = data
      .replace(headerRegex, "")
      .replace(leftStartRegex, "")
      .replace(largeLineBreak, "\n");

    const newPath = path.replace(".ass", ".txt");
    fs.writeFile(newPath, refinedText, { encoding: "utf16le" }, (err) => {
      if (!err) {
        console.log(`${newPath} created`);
      }
    });
  });
});
