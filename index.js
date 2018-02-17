//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var Article = require('./src/models/Article');

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
        req.session = undefined;
        res.redirect('/');
    } else {

        
        Article.ajouter(libelle, qte, pu, function () {

        });

        res.redirect('/afficher'); 

    }
});

app.get('/afficher', function (req, res) {
   
    Article.afficher(function (articles) {
        res.render('show', {articles:articles});
    });
    
});

app.get('/supprimer/:id', function (req, res) {
    
    var id = req.params.id;
    Article.supprimer(id); 
        res.redirect('/afficher');
    
});


app.listen(8080);