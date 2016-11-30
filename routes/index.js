var express = require('express');
var router = express.Router();

const db = require('../queries');

router.get('/lists', db.getAllLists);
router.get('/lists/:id', db.getSingleList);



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
