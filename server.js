const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    try {
        const data = req.body.data || [];
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercase = lowercaseAlphabets.sort().pop() || '';

        const response = {
            is_success: true,
            user_id: "john_doe_17091999",  // Replace with actual user_id logic
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        };
        res.json(response);
    } catch (error) {
        res.json({ is_success: false, error: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
