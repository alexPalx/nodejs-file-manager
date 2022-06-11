import { resolve, sep } from "path";
import { access } from "fs/promises";

export const cd = async (currentDir, destDir) => {
    if (!destDir) {
        console.log('Operation failed');
        return currentDir;
    }

    const resolvedPath = resolve(currentDir, destDir);

    try {
        await access(resolvedPath);
    }
    catch {
        console.log('Operation failed');
        return currentDir;
    }
    return resolvedPath;
};

export const up = (currentDir) => {
    return resolve(currentDir, `..${sep}`);
};
