var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://sneedelpee:sneedelpee1@ds147052.mlab.com:47052/my2do');
module.exports = {mongoose};
