import { rename } from 'fs/promises';
import { join } from 'path';

export const rn = async (currentDir, fileName, renamedFileName) => {
    if (!fileName || !renamedFileName) {
        console.log(`Operation failed. Use "rn file_name renamed_file_name"`);
        return;
    }

    const filePath = join(currentDir, fileName);
    const renamedFilePath = join(currentDir, renamedFileName);

    await rename(filePath, renamedFilePath)
        .catch((err) => {
            console.log(`Operation failed: ${err}`);
        });
};