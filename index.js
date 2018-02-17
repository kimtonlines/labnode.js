//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');

//
app.set('view engine', 'ejs');

// Middelware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session ({
    secret: 'azertazerty',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
})); 

//   Route
app.get('/', function (req, res) {
    res.render('home', {menu: "Accueil - Article"});
});

app.get('/ajouter', function (req, res) {
    res.render('add');
});

app.post('/ajouter', function (req, res) {
    var libelle = req.body.libelle;
    var qte = req.body.qte;
    var pu = req.body.pu;

    if (libelle === undefined || libelle === '' || qte === undefined || qte === '' || pu === undefined || pu === ''){
        res.redirect('/');
    }

    req.session.data = [libelle, qte, pu];
    res.redirect('/afficher'); 
});

app.get('/afficher', function (req, res) {
    if (req.session.data) {
        res.locals.data = req.session.data;
        req.session.data = undefined;
    }
    res.render('show');
});


app.listen(8080);