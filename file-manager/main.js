import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

import { homedir } from 'os';
import { cd, up } from './nav-and-working-dir/nav.mjs';
import { ls } from './nav-and-working-dir/ls.mjs';

import { cat } from './file-system/read-file.mjs';
import { add } from './file-system/create-file.mjs';
import { rn } from './file-system/rename-file.mjs'

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

const helloMessage = `Welcome to the File Manager, ${username}!`;
const byeMessage = `Thank you for using File Manager, ${username}!`;

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
            console.log('test');
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
        // checking other commands

        default:
            console.log('Invalid input');
            break;
    }
    console.log(`You are currently in ${currentDir}`);
});
