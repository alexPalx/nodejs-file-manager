import { rm as fsRm } from 'fs/promises';
import { join } from 'path';

export const rm = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use "rm file_name"`);
        return;
    }

    const filePath = join(currentDir, fileName);

    await fsRm(filePath).catch(() => {
        console.log(`Operation failed. The file "${fileName}" doesn't exist.`);
        return;
    });
};