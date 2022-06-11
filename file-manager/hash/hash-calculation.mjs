import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { createHash } from 'crypto';
import { resolve } from 'path';

export const hash = async (currentDir, fileName) => {
    if (!fileName) {
        console.log(`Operation failed. Use "hash path_to_file"`);
        return;
    }

    const filePath = resolve(currentDir, fileName);

    try {
        await access(filePath);
    }
    catch {
        console.log(`Operation failed. The file "${fileName}" doesn't exist.`);
        return;
    }

    const fileHash = createHash('sha256');
    const readStream = createReadStream(filePath);

    readStream.on('data', (data) => {
        fileHash.update(data);
    });

    readStream.on('end', () => {
        console.log(fileHash.digest('hex'));
        console.log(`\nYou are currently in ${currentDir}`);
    });
};