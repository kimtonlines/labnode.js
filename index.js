//

const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');
var Article = require('./src/models/Article');

//
app.set('view engine', 'ejs');

// Middelware
app.use(cors());
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
    
    if (req.body.libelle === undefined || req.body.libelle=== '' || req.body.qte=== undefined || req.body.qte === '' || req.body.pu === undefined || req.body.pu === ''){
        req.session = undefined;
        res.redirect('/');
    } else {

        article = [req.body.libelle, req.body.qte, req.body.pu];
        Article.ajouter(article)
        res.redirect('/afficher'); 

    }
});

app.get('/afficher', function (req, res) {
   
    Article.afficher(function (articles) {
        res.render('show', {articles:articles});
    });
    
});

app.get('/article/:id', function (req, res) {
    //header('Access-Control-Allow-Origin: *');
    var id = req.params.id;
    Article.findOne(id, function (article) {
        res.render('infos', {article:article});
    })
    
});

app.get('/modifier/:id', function (req, res) {
    
    var id = req.params.id;
    Article.findOne(id, function (article) {
        res.render('update', {article:article});
    })
    
});

app.post('/modifier/:id', function (req, res) {

    if (req.body.libelle === undefined || req.body.libelle=== '' || req.body.qte=== undefined || req.body.qte === '' || req.body.pu === undefined || req.body.pu === ''){
        req.session = undefined;
        res.redirect('/');
    } else {

    article = [req.body.libelle, req.body.qte, req.body.pu];
    var id = req.params.id;
    Article.update(id, article);
    res.redirect('/afficher');
    }
});

app.get('/supprimer/:id', function (req, res) {
    
    var id = req.params.id;
    Article.supprimer(id)
        res.redirect('/afficher');
});



app.listen(8080);