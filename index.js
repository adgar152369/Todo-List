const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
const { countryNames, stateNames, cityNames } = require('./js/country-state-city');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.use('/js', express.static('js'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const user = {
    name: "Adam",
    age: 26,
    occupation: "Web Developer",
    reasonForTravel: "n",
    places: [
        
    ]
}

const featured = {
    featuredPlaces: [
        {
            country: "France",
            city: "Paris",
            description: 'City of lights and love.',
            id: 1
        },
        {
            country: "United States",
            city: "New York City",
            description: 'The city that never sleeps.',
            id: 2
        },
        {
            country: "Iceland",
            city: "Vik",
            description: 'Black sand beach beauty.',
            id: 3
        }
    ]
}

let userPlaces = user.places;
let featuredPlaces = featured.featuredPlaces;

app.get('/', (req, res) => {
    res.render('home', { user, userPlaces, featuredPlaces });
});

app.get('/places/index', (req, res) => {
    res.render('index', { userPlaces });
})

app.get('/places/new', (req, res) => {
    res.render('new', { countryNames });
});

app.get('/places/:id', (req, res) => {
    const { id } = req.params;
    const featuredPlace = featuredPlaces.find(f => f.id === parseInt(id));
    res.render('place', { featuredPlace });
});

app.get('/places/index/:id', (req, res) => {
    const { id } = req.params;
    const userPlace = userPlaces.find(p => p.id === parseInt(id));
    console.log(userPlaces)
    res.render('my-place', { userPlace })
});

// app.get('/places/my-places/:id', (req, res) => {
//     const { id } = req.params;
//     const placeId = userPlaces.find(p => p.id === parseInt(id));
//     res.render('my-places', { placeId, userPlaces })
// }) 

app.post('/places/index', (req, res) => {
    const { country, state, city, color } = req.body;
    userPlaces.push({ country, state, city, color, id: Math.floor(Math.random() * 100) })
    res.redirect('/places/index');
});

app.delete('/places/:id', (req, res) => {
    const { id } = req.params;
    userPlaces = userPlaces.filter(p => p.id !== id);
    res.redirect('/places');
})





app.listen(3000, () => {
    console.log('listening on port 3000!');
})




