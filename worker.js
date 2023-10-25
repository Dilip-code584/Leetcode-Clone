onmessage = function(event) {
    const { code, language } = event.data;

    try {
        let output;
        if (language === 'python') {
            output = executePythonCode(code);
        } else if (language === 'c') {
            output = executeCCode(code);
        } else if (language === 'cpp') {
            output = executeCppCode(code);
        } else {
            throw new Error('Unsupported language');
        }
        postMessage(output);
    } catch (error) {
        postMessage('Code execution failed: ' + error.message);
    }
}

function executePythonCode(code) {
    try {
        return eval(code);
    } catch (error) {
        throw new Error('Python execution failed: ' + error.message);
    }
}

function executeCCode(code) {
    try {
        // Implement C code execution logic here
        return 'C code output';
    } catch (error) {
        throw new Error('C execution failed: ' + error.message);
    }
}

function executeCppCode(code) {
    try {
        // Implement C++ code execution logic here
        return 'C++ code output';
    } catch (error) {
        throw new Error('C++ execution failed: ' + error.message);
    }
}
