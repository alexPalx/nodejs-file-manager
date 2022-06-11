import {
    createReadStream,
    createWriteStream
} from 'fs';
import { access } from 'fs/promises';
import { resolve, sep } from 'path';
import { createBrotliDecompress } from 'zlib';

export const decompress = async (currentDir, srcPath, destPath) => {
    if (!srcPath) {
        console.log(`Operation failed. Use "compress src_file_path dest_file_path"`);
        return;
    }

    const absoluteSrcPath = resolve(currentDir, srcPath);
    let absoluteDestPath;
    if (!destPath) {
        absoluteDestPath = absoluteSrcPath.slice(0, -3);
    }
    else absoluteDestPath = resolve(currentDir, destPath);

    try {
        await access(absoluteSrcPath);
    }
    catch {
        console.log(`Operation failed. The file "${absoluteSrcPath
            .slice(absoluteSrcPath
                .includes(sep) ?
                absoluteSrcPath.lastIndexOf(sep) + 1 :
                absoluteSrcPath)}" doesn't exist.`);
    }

    const brotliDecompress = createBrotliDecompress();
    const readStream = createReadStream(absoluteSrcPath);
    const writeStream = createWriteStream(absoluteDestPath);

    readStream
        .pipe(brotliDecompress)
        .pipe(writeStream);
};