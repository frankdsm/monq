'use strcit';

const async = require('async');
const MongoClient = require('mongodb').MongoClient;

exports.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/monq_tests';

before(function onMongoClient(done) {
    MongoClient.connect(exports.uri, function (err, db) {
        if (err) {
            return done(err);
        }
        exports.db = db;
        done();
    });
});

exports.each = function (fixture, fn, done) {
    async.each(fixture, function (args, callback) {
        fn.apply(undefined, args.concat([callback]));
    }, done);
};

exports.flushWorker = function (worker, done) {
    worker.start();
    worker.once('empty', function () {
        worker.stop(done);
    });
};
