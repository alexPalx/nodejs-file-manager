import {
    createReadStream,
    createWriteStream
} from 'fs';
import { access } from 'fs/promises';
import { resolve, sep } from 'path';
import { createBrotliCompress } from 'zlib';

export const compress = async (currentDir, srcPath, destPath) => {
    if (!srcPath) {
        console.log(`Operation failed. Use "compress src_file_path dest_file_path"`);
        return;
    }

    const absoluteSrcPath = resolve(currentDir, srcPath);
    let absoluteDestPath;
    if (!destPath) {
        absoluteDestPath = absoluteSrcPath + '.br';
    }
    else absoluteDestPath = resolve(currentDir, destPath) + '.br';

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

    const brotliCompress = createBrotliCompress();
    const readStream = createReadStream(absoluteSrcPath);
    const writeStream = createWriteStream(absoluteDestPath);

    readStream
        .pipe(brotliCompress)
        .pipe(writeStream);
};