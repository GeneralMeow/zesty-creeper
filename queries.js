var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/todolist';
var db = pgp(connectionString);


function getAllLists(req, res, next) {
  db.any('select * from lists')
    .then(function (data) {

      res.render('index');
      // res.status(200)
      //   .json({
      //     status: 'success',
      //     data: data,
      //     message: 'Retrieved ALL lists'
        // });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleList(req, res, next) {
  var listID = parseInt(req.params.id);
  db.one('select * from lists where id = $1', listID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE list'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createList(req, res, next) {
  db.none('insert into lists(name)' +
      'values(${name})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one list'
        });
    })
    .catch(function (err) {
      return next(err);
    });
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

function removeList(req, res, next) {
  var listID = parseInt(req.params.id);
  db.result('delete from lists where id = $1', listID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} list`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllLists,
  getSingleList,
  createList,
  updateList,
  removeList
};
