import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { createHash } from 'crypto';
import { resolve, isAbsolute, basename } from 'path';

export const hash = async (currentDir, fileName) => {
    const returnMessage = `You are currently in ${currentDir}`;

    if (!fileName) {
        console.log(`Operation failed. Use: hash [filename|path_to_file]`);
        console.log(returnMessage);
        return;
    }

    const filePath = isAbsolute(fileName) ?
        fileName :
        resolve(currentDir, fileName);

    try {
        await access(filePath);
    }
    catch {
        console.log(`Operation failed. The file "${basename(fileName)}" doesn't exist.`);
        console.log(returnMessage);
        return;
    }

    const fileHash = createHash('sha256');
    const readStream = createReadStream(filePath);

    readStream.on('data', (data) => {
        fileHash.update(data);
    });

    readStream.on('end', () => {
        console.log(fileHash.digest('hex'));
        console.log(returnMessage);
    });
};