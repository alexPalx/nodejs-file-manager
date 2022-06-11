import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';

export const cat = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use "cat file_name"`);
        return;
    }

    const filePath = join(currentDir, fileName);

    try {
        await access(filePath);
    }
    catch {
        console.log(`Operation failed. The file "${fileName}" doesn't exist.`);
        return;
    }

    const readStream = createReadStream(filePath);

    readStream.pipe(process.stdout);
    readStream.on('end', () => {
        console.log(`\nYou are currently in ${currentDir}`);
    });
};