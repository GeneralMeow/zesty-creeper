var express = require('express');
var router = express.Router();

const db = require('../queries');
const { add } = require('../functionFactory')

router.get('/', function(req, res, next){
  db.getAllLists()
  .then(function (data) {

      res.render('index', {add});
      // res.status(200)
      //   .json({
      //     status: 'success',
      //     data: data,
      //     message: 'Retrieved ALL lists'
        // });
    })
    .catch(function (err) {
      return next(err);
    })
})

router.get( '/lists/:id', (request, response) => {
  const { id } = request.params

  db.tasksForList( id )
    .then( tasks => response.render( 'tasks', { tasks, id } ) )
})

// router.get( '/lists/:id', db.getSingleList );

router.post( '/lists/:id', (request, response) => {
  const { description } = request.body
  const { id } = request.params

  db.createTask( description, id )
    .then(task => response.redirect( `/lists/${id}` ) )
})

router.put('/lists/:id', db.updateList)

router.get('/lists/:list_id/:task_id', (request, response) => {
  const { task_id, list_id } = request.params
  // console.log('your params task then list', task_id, list_id)

  db.removeTask( task_id )
    response.redirect('/lists/'+list_id)})


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
