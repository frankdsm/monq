var Connection = require('./connection');

module.exports = function (db, options) {
    return new Connection(db, options);
};