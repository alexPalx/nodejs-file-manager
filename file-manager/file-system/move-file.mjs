import { access, cp as fsCp, rm } from 'fs/promises';
import { resolve, sep } from 'path';

export const mv = async (currentDir, srcPath, destPath) => {
    if (!srcPath || !destPath) {
        console.log(`Operation failed. Use "mv src_file_path dest_file_path"`);
        return;
    }
    try {
        await access(destPath);
    }
    catch {
        const srcDir = resolve(currentDir, srcPath);
        const destDir = resolve(currentDir, destPath);
        await fsCp(srcDir, destDir)
            .then(() => rm(srcDir))
            .catch(() => null);
        return;
    }

    const fileName = destPath.slice(destPath.includes(sep) ?
        destPath.lastIndexOf(sep) + 1 :
        destPath);
    console.log(`Operation failed. The file "${fileName}" already exists.`);
};