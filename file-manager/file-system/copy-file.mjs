import { access, cp as fsCp, stat } from 'fs/promises';
import { resolve, isAbsolute, basename } from 'path';

export const cp = async (currentDir, srcPath, destPath) => {
    if (!srcPath || !destPath) {
        console.log(`Operation failed. Use: cp [filename|path_to_file] [path_to_new_directory]`);
        return;
    }

    const fileName = basename(srcPath);

    try {
        await access(resolve(currentDir, srcPath));
    }
    catch {
        console.log(`Operation failed. The file "${fileName}" doesn't exist.`);
        return;
    }

    try {
        await access(resolve(destPath, fileName));
    }
    catch {
        const resolvedSrcPath = isAbsolute(srcPath) ?
            srcPath :
            resolve(currentDir, srcPath);
        const resolvedDestPath = isAbsolute(destPath) ?
            destPath :
            resolve(currentDir, destPath);

        const isDestPathDirectory = await stat(resolvedDestPath)
            .then(stats => stats.isDirectory())
            .catch(err => {
                console.log(`Operation failed: ${err}`);
            });
        if (!isDestPathDirectory) {
            if (isDestPathDirectory === false) {
                console.log('Operation failed. The second argument must be a directory.')
            }
            return;
        }

        await fsCp(resolvedSrcPath, resolve(resolvedDestPath, fileName))
            .catch(err => {
                console.log(`Operation failed: ${err}`);
            });
        return;
    }

    console.log(`Operation failed. The file "${fileName}" already exists.`);
};