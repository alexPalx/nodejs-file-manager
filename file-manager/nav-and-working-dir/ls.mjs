import { readdir } from "fs/promises";
import { sep } from "path";

export const ls = async (currentDir) => {
    let files = await readdir(currentDir, { withFileTypes: true })
        .catch(() => {
            console.log(`Operation failed. Failed to read the contents of directory ${currentDir}.`);
        });

    files
        .forEach(file =>
            console.log(file.isDirectory() ?
                file.name + sep :
                file.name));
};