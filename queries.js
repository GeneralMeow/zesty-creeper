var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/todolist';
var db = pgp(connectionString);


function getAllLists(req, res, next) {

  return db.any('select * from lists')
  // db.any('select * from lists')
  //   .then(function (data) {
  //
  //     res.render('index');
  //     // res.status(200)
  //     //   .json({
  //     //     status: 'success',
  //     //     data: data,
  //     //     message: 'Retrieved ALL lists'
  //       // });
  //   })
  //   .catch(function (err) {
  //     return next(err);
  //   });
}

const tasksForList = id =>
  db.any( 'select * from tasks where list_id = $1', id )

// function getSingleList(req, res, next) {
//   var listID = parseInt(req.params.id);
//   db.one('select * from lists where id = $1', listID)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ONE list'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function createTask(description, list_id) {
  return db.none('insert into tasks(description, list_id) values($1, $2)', [description, list_id])
}

function updateList(req, res, next) {
  db.none('update lists set name=$1', [req.body.name])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated list'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeTask(req, res, next) {
  var taskID = parseInt(req.params.id);
  db.result('delete from tasks where id = $1', taskID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} task`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllLists,
  createTask,
  updateList,
  removeTask,
  tasksForList
};
