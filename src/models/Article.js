
var connection = require('../db');

class Article {

    static ajouter ([libelle, qte, pu]) {

        connection.query('INSERT INTO article SET libelle = ?, qte = ?, pu = ?', [libelle, qte, pu], function (err){
            if (err) throw err;
        });
    }

    static afficher (cb) {

        connection.query('SELECT * FROM article', function (err, result){
            if (err) throw err;
            cb(result);
        });
    }

    static findOne (id, cb) {

        connection.query('SELECT * FROM article WHERE id = ? LIMIT 1', [id], function (error, result){
            if (error) throw error;
            cb(result[0]);
        });
    }

    static supprimer (id) {

        connection.query('DELETE FROM article WHERE id = ? LIMIT 1', [id], function (err){
            if (err) throw err;
        });
    }

    static update (id, [libelle, qte, pu]) {

        connection.query('UPDATE article SET libelle = ?, qte = ?, pu = ? WHERE id = ?', [libelle, qte, pu, id], function (err){
            if (err) throw err;
        });
    }
}

module.exports = Article;