import { access, cp as fsCp } from 'fs/promises';
import { resolve, sep } from 'path';

export const cp = async (currentDir, srcPath, destPath) => {
    if (!srcPath || !destPath) {
        console.log(`Operation failed. Use "cp src_file_path dest_file_path"`);
        return;
    }
    try {
        await access(destPath);
    }
    catch {
        await fsCp(resolve(currentDir, srcPath),
            resolve(currentDir, destPath));
        return;
    }

    const fileName = destPath.slice(destPath.includes(sep) ?
        destPath.lastIndexOf(sep) + 1 :
        destPath);
    console.log(`Operation failed. The file "${fileName}" already exists.`);
};