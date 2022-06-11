import { access, writeFile } from 'fs/promises';
import { join } from 'path';

export const add = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use "add file_name"`);
        return;
    }

    const filePath = join(currentDir, fileName);

    try {
        await access(filePath);
    }
    catch {
        await writeFile(filePath, '');
        return;
    }

    console.log(`Operation failed. The file "${fileName}" already exists.`);
};