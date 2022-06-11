import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

//--------------------- init ---------------------//
if (!process.argv[2] ||
    !process.argv[2].startsWith('--username=')) {
    throw new Error('Please use "npm run start -- --username=your_username" to start.');
}

const username = process.argv[2]
    .slice(process.argv[2].indexOf('=') + 1);

if (username.length === 0) {
    throw new Error('Username must be more than or equal to one character.')
};

const helloMessage = `Welcome to the File Manager, ${username}!`;
const byeMessage = `Thank you for using File Manager, ${username}!`;

console.log(helloMessage);
process.on('exit', () => console.log(byeMessage));
process.on('SIGINT', () => console.log(byeMessage));

//--------------------- user input ---------------------//
const readline = createInterface({ input, output });

readline.on('line', input => {
    switch (input) {
        case '.exit':
            return process.exit();
        case '.test':
            return console.log('test');
        // checking other commands

        default:
            return console.log('Invalid input');
    }
});
