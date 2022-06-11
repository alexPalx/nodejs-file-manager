import {
    EOL,
    cpus as getCpus,
    homedir,
    userInfo,
    arch
} from 'os';

export const getSysInfo = (arg) => {
    const operationFailedMessage = 'Operation failed. Use "os [--EOL|--cpus|--homedir|--username|--architecture]"';
    if (!arg) {
        return console.log(operationFailedMessage);
    }

    switch (arg.slice(2)) {
        case 'EOL':
            const systemEOL = JSON.stringify(EOL);
            console.log(systemEOL === '\\n' ?
                `LF: "\\n"` :
                `CRLF: "\\r\\n"`);
            break;
        case 'cpus':
            const cpus = getCpus();
            console.log(`Total CPUs: ${cpus.length}`);
            Array.from(cpus).forEach((cpu, i) => {
                console.log(`[${i}] ${cpu.model}`);
            });
            break;
        case 'homedir':
            console.log(homedir());
            break;
        case 'username':
            console.log(userInfo().username);
            break;
        case 'architecture':
            console.log(arch());
            break;
        default:
            console.log(operationFailedMessage);
            break;
    }
};