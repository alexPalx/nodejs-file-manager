import { rm as fsRm } from 'fs/promises';
import { resolve, isAbsolute, basename } from 'path';

export const rm = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use: rm [filename|path_to_file]`);
        return;
    }

    const filePath = isAbsolute(fileName) ?
        fileName :
        resolve(currentDir, fileName);

    await fsRm(filePath).catch(() => {
        console.log(`Operation failed. The file "${basename(fileName)}" doesn't exist.`);
        return;
    });
};