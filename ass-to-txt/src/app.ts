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

filePaths.forEach((filePath) => {
  const pathInfo = path.parse(filePath); //?
  const newPath = path.join(pathInfo.dir, "../txt", pathInfo.name + ".txt"); //?

  fs.readFile(filePath, { encoding: "utf16le" }, (err, data) => {
    const refinedText = data
      .replace(headerRegex, "")
      .replace(leftStartRegex, "")
      .replace(largeLineBreak, "\n");

    fs.writeFile(newPath, refinedText, { encoding: "utf16le" }, (err) => {
      if (!err) {
        console.log(`${newPath} created`);
      }
    });
  });
});
