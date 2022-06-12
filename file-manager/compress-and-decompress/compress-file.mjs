import {
    createReadStream,
    createWriteStream
} from 'fs';
import { access } from 'fs/promises';
import { resolve, sep, isAbsolute, basename } from 'path';
import { createBrotliCompress } from 'zlib';

export const compress = async (currentDir, srcPath, destPath) => {
    if (!srcPath) {
        console.log(`Operation failed. Use: compress [filename|path_to_file] (optional)[path_to_destination]`);
        return;
    }

    const absoluteSrcPath = isAbsolute(srcPath) ?
        srcPath :
        resolve(currentDir, srcPath);
    let absoluteDestPath;

    if (!destPath) {
        absoluteDestPath = absoluteSrcPath + '.br';
    }
    else absoluteDestPath = (isAbsolute(destPath) ?
        destPath :
        resolve(currentDir, destPath)) + '.br';

    try {
        await access(absoluteSrcPath);
    }
    catch {
        console.log(`Operation failed. The file "${basename(absoluteSrcPath).slice(0, basename(absoluteSrcPath).lastIndexOf('.'))}" doesn't exist.`);
        return;
    }

    const brotliCompress = createBrotliCompress();
    const readStream = createReadStream(absoluteSrcPath);
    const writeStream = createWriteStream(absoluteDestPath);

    readStream
        .pipe(brotliCompress)
        .pipe(writeStream);
};