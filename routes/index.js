var express = require('express');
var router = express.Router();

var standupController = require('../controllers/standup.server.controller.js')();

/* GET home page. */
router.route('/')
    .get(function (req, res) {
        standupController.getNotes(req, res);
    })
    .post(function (req, res) {
        standupController.getSpecificNotes(req, res);
    });


router.route('/newnote')
    .post(function (req, res) {
        standupController.postRequest(req, res);
    })
    .get(function (req, res) {
        standupController.getRequest(req, res);
    });

module.exports = router;
