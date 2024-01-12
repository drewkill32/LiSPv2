import fs from "fs";
import path from "path";

export const saveContent = (fileName, content, formatted = true) => {
  const json = formatted
    ? JSON.stringify(content, null, 2)
    : JSON.stringify(content);
  fs.writeFileSync(fileName, json);
};

export const ensureDir = (dir) => {
  dir.split(path.sep).reduce((prevPath, folder) => {
    const currentPath = path.join(prevPath, folder, path.sep);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  }, "");
};
