import { access, writeFile } from 'fs/promises';
import { resolve, isAbsolute } from 'path';

export const add = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use: add [filename|path_to_file]`);
        return;
    }

    const filePath = isAbsolute(fileName) ?
        fileName :
        resolve(currentDir, fileName);

    try {
        await access(filePath);
    }
    catch {
        await writeFile(filePath, '');
        return;
    }

    console.log(`Operation failed. The file "${fileName}" already exists.`);
};