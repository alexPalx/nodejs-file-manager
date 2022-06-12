import {
    createReadStream,
    createWriteStream
} from 'fs';
import { access } from 'fs/promises';
import { resolve, sep, isAbsolute } from 'path';
import { createBrotliDecompress } from 'zlib';

export const decompress = async (currentDir, srcPath, destPath) => {
    if (!srcPath) {
        console.log(`Operation failed. Use: decompress [filename|path_to_file] (optional)[path_to_destination]`);
        return;
    }

    const absoluteSrcPath = isAbsolute(srcPath) ?
        srcPath :
        resolve(currentDir, srcPath);
    let absoluteDestPath;

    if (!destPath) {
        absoluteDestPath = absoluteSrcPath.slice(0, -3);
    }
    else absoluteDestPath = isAbsolute(destPath) ?
        destPath :
        resolve(currentDir, destPath);

    try {
        await access(absoluteSrcPath);
    }
    catch {
        console.log(`Operation failed. The file "${basename(absoluteSrcPath).slice(0, basename(absoluteSrcPath).lastIndexOf('.'))}" doesn't exist.`);
        return;
    }

    const brotliDecompress = createBrotliDecompress();
    const readStream = createReadStream(absoluteSrcPath);
    const writeStream = createWriteStream(absoluteDestPath);

    readStream
        .pipe(brotliDecompress)
        .pipe(writeStream);
};