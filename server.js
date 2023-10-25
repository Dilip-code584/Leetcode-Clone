const express = require('express');
const bodyParser = require('body-parser');
const { executeCode } = require('./code-execution');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/execute', async (req, res) => {
    const { code, language } = req.body;
    try {
        const output = await executeCode(code, language);
        res.json({ output });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Code execution failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
