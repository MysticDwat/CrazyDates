const express = require('express');

const app = express();

let PORT = process.env.PORT || 3001;

app.get('/api/date/options', (req, res) => {
    res.json({
        message: "Server is running.",
        locations: [
            'Beach',
            'St.Pete',
            'Ybor City',
            'Sarasota',
            'Tampa',
            'Lakeland',
            'Bradenton',
            'SoHo',
            'Brandon',
            'Clearwater',
            'Plant City',
            'Hills County'
        ],
        events: [
            'Picnic',
            'Comedy',
            'Movie',
            'Museum',
            'Play',
            'Music',
            'Art',
            'History Tour',
            'Road Trip',
            'Scavenger Hunt',
            'Day Hike'
        ],
        food: [
            'Beer',
            'Latin',
            'Mexican',
            'African',
            'European',
            'American',
            'Asian',
            'Indian',
            'Food Truck',
            'Middle Eastern',
            'Bistro',
            'Seafood',
            'Foreign'
        ]
    });
});

app.get('/', (req, res) => {
    res.json({message: "Server is running."});
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});