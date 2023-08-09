const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    if (!Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const resultSet = new Set();
    const promises = [];

    for (const url of urls) {
        promises.push(
            axios.get(url)
                .then(response => {
                    const numbers = response.data.numbers || [];
                    numbers.forEach(number => resultSet.add(number));
                })
                .catch(error => {
                    // Ignore errors from unreachable URLs
                })
        );
    }

    await Promise.all(promises);

    const mergedNumbers = Array.from(resultSet).sort((a, b) => a - b);

    res.json({ numbers: mergedNumbers });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
