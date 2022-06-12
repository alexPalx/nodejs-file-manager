import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

import { homedir } from 'os';
import { cd, up } from './nav-and-working-dir/nav.mjs';
import { ls } from './nav-and-working-dir/ls.mjs';

import { cat } from './file-system/read-file.mjs';
import { add } from './file-system/create-file.mjs';
import { rn } from './file-system/rename-file.mjs';
import { cp } from './file-system/copy-file.mjs';
import { rm } from './file-system/delete-file.mjs';
import { mv } from './file-system/move-file.mjs';

import { hash } from './hash/hash-calculation.mjs';

import { compress } from './compress-and-decompress/compress-file.mjs';
import { decompress } from './compress-and-decompress/decompress-file.mjs';

import { getSysInfo } from './system-info/system-info.mjs';
import { getHelp } from './system-info/help.mjs';

//--------------------- init ---------------------//
if (!process.argv[2] ||
    !process.argv[2].startsWith('--username=')) {
    throw new Error('Please use "npm run start -- --username=your_username" to start.');
}

const username = process.argv[2]
    .slice(process.argv[2].indexOf('=') + 1);

if (username.length === 0) {
    throw new Error('Username must be more than or equal to one character.');
};

let currentDir = homedir();

const helloMessage = `Welcome to the File Manager, ${username}!\nTo exit, enter ".exit" or press the key combination Ctrl + C`;
const byeMessage = `──────────────────────────────────────────────\nThank you for using File Manager, ${username}!\n─────────────────▄▄───▐█────▄▄▄  .▄▄ · .▄▄ · ─\n─────▄▄▄───▄██▄──█▀───█─▄───▀▄ █·▐█ ▀. ▐█ ▀.──\n───▄██▀█▌─██▄▄──▐█▀▄─▐█▀────▐▀▀▄ ▄▀▀▀█▄▄▀▀▀█▄─\n──▐█▀▀▌───▄▀▌─▌─█─▌──▌─▌────▐█•█▌▐█▄▪▐█▐█▄▪▐█─\n──▌▀▄─▐──▀▄─▐▄─▐▄▐▄─▐▄─▐▄───.▀  ▀ ▀▀▀▀  ▀▀▀▀ ─`;

console.log(helloMessage);
console.log(`You are currently in ${currentDir}`);
process.on('exit', () => console.log(byeMessage));
process.on('SIGINT', () => console.log(byeMessage));

//--------------------- user input ---------------------//
const readline = createInterface({ input, output });

readline.on('line', async input => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case '.exit':
            process.exit();
        case '.test':
            console.log('\nTest not found.                                                          \n                                     ▓█████████████████▄  ▄▄             \n                                 ▄██████████████████████████████▄        \n                                ▓█████████████████████████████████       \n    ██  ██  █▄  ▄▄  ██  ██      █████ ▀███████████████████████████▌      \n   ▓██  ██  ██  ██ ▓██  ██      ████▌───   ▀▐▀▀▀▀█████████████████▌      \n    ██▀▀██  ██  ██  ██▀▀██       ██▌ ▀▓▓▀      ▀▓▀▓████ █▐████████       \n    ▓█  ██  ▓█  ██  ▓█  ██       ▀█▌                ███  ████████▀       \n    ▓█  ██▓  ████   ▓█  ██▓ ▄      ▀██▄      ──    ╓▓██▌  ███████▀       \n                                  ▐█████▌╖╖╖      ▓█▌   ██████▌          \n                                  ▐█████ ╢╝     ┴ ▓     ╟█████▌          \n                                  ▓▀█▓▄█▌ ▄▄    ╓▄████▄▄  ▀███▌          \n                                ▄████████▓▓▓▓▄██████████████▄ ▀▀         \n                               ███████████████████████████████▌          \n');
            break;

        // directory
        case 'up':
            currentDir = up(currentDir);
            break;
        case 'cd':
            currentDir = await cd(currentDir, args[0]);
            break;
        case 'ls':
            ls(currentDir);
            break;

        // file system
        case 'cat':
            return cat(currentDir, args[0]);
        case 'add':
            await add(currentDir, args[0]);
            break;
        case 'rn':
            await rn(currentDir, args[0], args[1]);
            break;
        case 'cp':
            await cp(currentDir, args[0], args[1]);
            break;
        case 'rm':
            await rm(currentDir, args[0]);
            break;
        case 'mv':
            await mv(currentDir, args[0], args[1]);
            break;

        // hash
        case 'hash':
            return hash(currentDir, args[0]);

        // compress & decompress
        case 'compress':
            await compress(currentDir, args[0], args[1]);
            break;
        case 'decompress':
            await decompress(currentDir, args[0], args[1]);
            break;

        // os
        case 'os':
            getSysInfo(args[0]);
            break;
        
        //help
        case 'help':
            getHelp(args[0]);
            break;

        // invalid command
        default:
            console.log('Invalid input');
            break;
    }
    console.log(`You are currently in ${currentDir}`);
});
