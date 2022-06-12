const help = {
    up: 'Go upper from current directory. Use: up',
    cd: 'Go to dedicated folder from current directory. Use: cd [path_to_directory]',
    ls: 'List all files and folder in current directory and print it to console. Use: ls',

    cat: 'Read file and print it\'s content in console. Use: cat [filename|path_to_file]',
    add: 'Create an empty file. Use: add [filename|path_to_file]',
    rn: 'Rename file. Use: rn [filename|path_to_file] [new_filename]',
    cp: 'Copy file. Use: [filename|path_to_file] [path_to_new_directory]',
    mv: 'Move file. Use: [filename|path_to_file] [path_to_new_directory]',
    rm: 'Delete file. Use: rm [filename|path_to_file]',

    os: 'Operating system info. Use "help [--EOL|--cpus|--homedir|--username|--architecture]" for more information.',
    ['--EOL']: 'Display EOL (default system End-Of-Line). Use: os --EOL',
    ['--cpus']: 'Display host machine CPUs info. Use: os --cpus',
    ['--homedir']: 'Display home directory. Use: os --homedir',
    ['--username']: 'Display current system user name. Use: os --username',
    ['--architecture']: 'Display CPU architecture. Use: os --architecture',

    hash: 'Calculate hash for file and print it into console. Use: hash [filename|path_to_file]',

    compress: 'Сompress file (using Brotli algorithm). Use: compress [filename|path_to_file] (optional)[path_to_destination]',
    decompress: 'Decompress file (using Brotli algorithm). Use: decompress [filename|path_to_file] (optional)[path_to_destination]',

    help: 'Shows a list of commands. For detailed information about the command, use: help [command|--arg]',

    list: 'List of available commands (for detailed information about the command, use: help [command|--arg]):\nNavigation & working directory operations: up, cd, ls\nOperations with files: cat, add, rn, cp, mv, rm\nHash calculation: hash\nCompress and decompress operations: compress, decompress\nOperating system info: os',
}

export const getHelp = (prop) => {
    if (!prop) {
        console.log(help.list);
        return;
    }
    prop in help ?
        console.log(help[prop]) :
        console.log(`Operation failed. Help doesn't contain ${prop}.`);
};