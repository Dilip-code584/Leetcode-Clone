const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCode(code, language) {
    let cmd;

    if (language === 'python') {
        cmd = `docker run --rm -i python:3.9 python -c "${code}"`;
    } else if (language === 'c') {
        cmd = `echo '${code}' > code.c && docker run --rm -i gcc:latest sh -c "gcc code.c -o code && ./code"`;
    } else if (language === 'cpp') {
        cmd = `echo '${code}' > code.cpp && docker run --rm -i gcc:latest sh -c "g++ code.cpp -o code && ./code"`;
    } else {
        throw new Error('Unsupported language');
    }

    try {
        const { stdout, stderr } = await exec(cmd);
        if (stderr) {
            throw new Error(stderr);
        }
        return stdout;
    } catch (error) {
        throw error;
    }
}

module.exports = { executeCode };
