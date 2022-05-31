const express = require('express');

const app = express();

let PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.json({message: "Server is running."});
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});