import { rename } from 'fs/promises';
import { resolve, isAbsolute, dirname, sep } from 'path';

export const rn = async (currentDir, fileName, renamedFileName) => {
    if (!fileName || !renamedFileName) {
        console.log(`Operation failed. Use: rn [filename|path_to_file] [new_filename]`);
        return;
    }

    const filePath = isAbsolute(fileName) ?
        fileName :
        resolve(currentDir, fileName);
    
    if (renamedFileName.includes('\\') || renamedFileName.includes('/')) {
        console.log('Operation failed. The second argument must be a new filename, not a directory.');
        return;
    }

    const renamedFilePath = resolve(dirname(filePath), renamedFileName);

    await rename(filePath, renamedFilePath)
        .catch((err) => {
            console.log(`Operation failed: ${err}.`);
        });
};