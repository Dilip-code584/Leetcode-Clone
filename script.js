document.getElementById('execute').addEventListener('click', () => {
    const code = document.getElementById('code').value;
    const language = document.getElementById('language').value;

    const workerCode = `
        onmessage = function(event) {
            const { code, language } = event.data;
            try {
                let result = eval(code);
                postMessage(result);
            } catch (error) {
                postMessage('Code execution failed: ' + error);
            }
        };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({ code, language });

    worker.onmessage = function(event) {
        const output = event.data;
        document.getElementById('output').textContent = output;
    };

    worker.onerror = function(error) {
        console.error('Worker error:', error);
        document.getElementById('output').textContent = 'Code execution failed.';
    };
});
