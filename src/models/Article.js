
var connection = require('../db');

class Article {

    static ajouter (libelle, qte, pu, cb) {

        connection.query('INSERT INTO article SET libelle = ?, qte = ?, pu = ?', [libelle, qte, pu], function (err, result){
            if (err) throw err;
            cb(result);
        });
    }

    static afficher (cb) {

        connection.query('SELECT * FROM article', function (err, result){
            if (err) throw err;
            cb(result);
        });
    }

    static supprimer (id) {

        connection.query('DELETE FROM article WHERE id = ? LIMIT 1', [id], function (err){
            if (err) throw err;
        });
    }
}

module.exports = Article;