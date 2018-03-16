var Standup = require('../models/standup.server.model.js');

var standupController = function () {


    var getRequest = function (req, res) {

        res.render('newnote', {
            title: 'Standup - Add Note',
            message: ''
        });

    };


    var postRequest = function (req, res) {


        var entry = new Standup(req.body);
        entry.save(function (err) {
            if (err) {

                var errMsg = 'Sorry,there was an error saving the stand-up meeting note. ' + err;
                res.render('newnote', {
                    title: 'Error-Standup Note',
                    message: errMsg
                });
            } else {
                res.redirect(301, '/');
            }
        });
    };

    var getNotes = function (req, res) {

        var query = Standup.find()
            .sort({
                createdOn: 'desc'
            })
            .limit(12)
            .exec(function (err, results) {

                res.render('index', {
                    title: 'Standup - Notes List',
                    notes: results
                });

            });


    };



    var getSpecificNotes = function (req, res) {

        var filter = req.body.memberName;
        var query = Standup.find();

        if (filter.length > 0) {
            query.where({
                memberName: filter
            });
        }
        query.sort({
                createdOn: 'desc'
            })
            .limit(12)
            .exec(function (err, results) {

                res.render('index', {
                    title: 'Standup - Notes List',
                    notes: results
                });

            });

    };

    return {
        getRequest: getRequest,
        postRequest: postRequest,
        getNotes: getNotes,
        getSpecificNotes: getSpecificNotes
    };

};

module.exports = standupController;
