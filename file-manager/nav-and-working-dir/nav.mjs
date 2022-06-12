import { resolve, sep, isAbsolute } from "path";
import { access } from "fs/promises";

export const cd = async (currentDir, destDir) => {
    if (!destDir) {
        console.log('Operation failed. Use: cd [path_to_directory]');
        return currentDir;
    }

    const resolvedPath = isAbsolute(destDir) ?
        resolve(destDir) :
        resolve(currentDir, destDir);

    try {
        await access(resolvedPath);
    }
    catch {
        console.log('Operation failed. Directory doesn\'t exist or you don\'t have access.');
        return currentDir;
    }
    return resolvedPath;
};

export const up = (currentDir) => {
    return resolve(currentDir, `..${sep}`);
};