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
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL lists'
        });
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
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}




module.exports = {
  getAllLists: getAllLists,
  getSingleList: getSingleList
};
