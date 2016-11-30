var express = require('express');
var router = express.Router();

const db = require('../queries');
const { add } = require('../index')

router.get('/', db.getAllLists);
router.get('/lists/:id', db.getSingleList);
router.post('/', db.createList);
router.put('/lists/:id', db.updateList);
router.delete('/lists/:id', db.removeList);



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post( '/', function( request, response, next ) {
//   db.add
//   .then( result => {
//     response.redirect('/')
//   })
//   .catch( error => response.render('error', error))
// }

module.exports = router;
